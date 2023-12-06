//SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract SCScanOracle is ChainlinkClient {
    using Chainlink for Chainlink.Request;

    bytes32 private jobId;
    uint256 private fee;
    address public owner;
    string public uri;

    // Smart Contract Address  => ABI Info
    uint256 public totalABIInformation;
    mapping(address => string) public abiInformation;
    mapping(bytes32 => address) private requestIdToMsgSender;

    event AuditLog(bytes32 indexed requestId, address addr);

    /**
     * @dev Using Sepolia
     */
    constructor() {
        owner = msg.sender;
        uri = "https://scscanapi.azurewebsites.net";
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        setChainlinkOracle(0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD);
        jobId = "7d80a6386ef543a3abb52817f6707e3b"; // string jobID
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0.1 * 10**18 (Varies by network and job)
    }

    function request(address addr) public {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        string memory url = getURL(addr);
        req.add("get", url);
        req.add("path", "cid");

        bytes32 requestId = sendChainlinkRequest(req, fee);

        // Store information for Fulfillment
        requestIdToMsgSender[requestId] = addr;
    }

    function fulfill(bytes32 requestId, string memory cid)
        public
        recordChainlinkFulfillment(requestId)
    {
        emit AuditLog(requestId, requestIdToMsgSender[requestId]);

        bytes memory abiCIDBytes = bytes(cid);
        if (abiCIDBytes.length != 0) {
            totalABIInformation++;
            abiInformation[requestIdToMsgSender[requestId]] = cid;
        }

        requestIdToMsgSender[requestId] = address(0);   // !important, need to reset request data
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorised");
        _;
    }

    /**
     * @dev Generates an endpoint URL for a given contract address.
     * @param addr The address of the smart contract.
     * @return The generated endpoint URL.
     */
    function getURL(address addr) private view returns (string memory) {
        string memory contractQuery = string.concat(
            "/api/onchain?contract=",
            Strings.toHexString(addr)
        );
        string memory networkQuery = string.concat(contractQuery, "&network=");
        string memory endpoint = string.concat(
            networkQuery,
            Strings.toString(block.chainid)
        );
        string memory url = string.concat(uri, endpoint);
        return url;
    }
}
