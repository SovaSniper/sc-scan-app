import { BigNumber, ethers } from "ethers";
import { getRPC } from "@/lib/constant/rpc";
import { getContractOracle } from "@/lib/sc-scan/get_contract";
import { ABI } from "@/lib/sc-scan/abi";

export class SCScanOracle {
    rpcURL: string;
    provider: ethers.providers.JsonRpcProvider;
    signer?: ethers.Wallet;
    oracleAddress: string;
    contract?: ethers.Contract;

    constructor(network: string) {
        this.rpcURL = getRPC(network);
        console.log(network, this.rpcURL);
        this.provider = new ethers.providers.JsonRpcProvider(this.rpcURL);
        this.oracleAddress = getContractOracle(network);
        if (process.env.SC_SCAN_WALLET) {
            this.signer = new ethers.Wallet(process.env.SC_SCAN_WALLET || "", this.provider);
        }
        if (this.oracleAddress) {
            this.contract = new ethers.Contract(this.oracleAddress, ABI, this.signer);
        }
    }

    async abiInformation(contractAddress: string): Promise<string> {
        if (!this.contract) {
            return "";
        }

        if (!this.signer) {
            const contract: ethers.Contract = new ethers.Contract(this.oracleAddress, ABI, this.provider);
            return await contract.ontract.abiInformation(contractAddress);
        }

        return await this.contract.abiInformation(contractAddress);
    }

    async request(contractAddress: string, awaitConfirmation: boolean = false) {
        if (ethers.utils.isAddress(contractAddress) === false) {
            return;
        }

        if (!this.contract) {
            return;
        }

        // Let it process on chain
        if (awaitConfirmation) {
            await this.contract.request(contractAddress);
        } else {
            this.contract.request(contractAddress);
        }
    }

    async totalABIInformation(): Promise<number> {
        if (!this.contract) {
            return 0;
        }

        if (!this.signer) {
            const contract: ethers.Contract = new ethers.Contract(this.oracleAddress, ABI, this.provider);
            const bn: BigNumber = await contract.totalABIInformation();
            return bn.toNumber();
        }

        // Let it process on chain
        const bn: BigNumber = await this.contract.totalABIInformation();
        return bn.toNumber();
    }
}