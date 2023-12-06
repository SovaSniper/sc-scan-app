import { ChainID } from "./chainID";

export const getAPIKey = (network: string): string => {
    switch (network) {
        case ChainID.ETHEREUM_MAINNET:
        case ChainID.ETHEREUM_GOERLI:
        case ChainID.ETHEREUM_SEPOLIA:
            return process.env.ETHERSCAN_API_TOKEN || '';
        case ChainID.POLYGON_MAINNET:
        case ChainID.POLYGON_MUMBAI:
            return process.env.POLYGONSCAN_API_TOKEN || '';
        case ChainID.FANTOM_MAINNET:
        case ChainID.FANTOM_TESTNET:
            return process.env.FTMSCAN_API_TOKEN || '';
        default:
            return '';
    }
}