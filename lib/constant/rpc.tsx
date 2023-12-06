import { ChainID } from "./chainID";

export const getRPC = (network: string): string => {
    switch (network) {
        case ChainID.ETHEREUM_MAINNET:
            return RPC.ETHEREUM_MAINNET;
        case ChainID.ETHEREUM_GOERLI:
            return RPC.ETHEREUM_GOERLI;
        case ChainID.ETHEREUM_SEPOLIA:
            return RPC.ETHEREUM_SEPOLIA;
        case ChainID.POLYGON_MAINNET:
            return RPC.POLYGON_MAINNET;
        case ChainID.POLYGON_MUMBAI:
            return RPC.POLYGON_MUMBAI;
        case ChainID.FANTOM_MAINNET:
            return RPC.FANTOM_MAINNET;
        case ChainID.FANTOM_TESTNET:
            return RPC.FANTOM_TESTNET;
        case ChainID.AVALANCHE_MAINNET:
            return RPC.AVALANCHE_MAINNET;
        case ChainID.AVALANCHE_FUJI:
            return RPC.AVALANCHE_FUJI;
        default:
            return "";
    }
}
export enum RPC {
    ETHEREUM_MAINNET = 'https://rpc.ankr.com/eth',
    ETHEREUM_GOERLI = 'https://rpc.ankr.com/eth_goerli',
    ETHEREUM_SEPOLIA = 'https://ethereum-sepolia.publicnode.com',
    POLYGON_MAINNET = 'https://rpc.ankr.com/polygon_zkevm',
    POLYGON_MUMBAI = 'https://rpc.ankr.com/polygon_mumbai',
    AVALANCHE_MAINNET = 'https://1rpc.io/avax/c',
    AVALANCHE_FUJI = 'https://avalanche-fuji-c-chain.publicnode.com	',
    FANTOM_MAINNET = 'https://rpc.ankr.com/fantom',
    FANTOM_TESTNET = 'https://rpc.ankr.com/fantom_testnet',
}
