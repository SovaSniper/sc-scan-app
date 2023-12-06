import { ChainID } from "@/lib/constant/chainID";

export const getContractOracle = (chainId: string): string => {
    switch (chainId) {
        case ChainID.ETHEREUM_MAINNET:
            return "";
        case ChainID.ETHEREUM_SEPOLIA:
            return "0x1aee14730d6d9bb52d400b23f08c0e8fab3a0388";
        case ChainID.POLYGON_MAINNET:
            return "";
        case ChainID.POLYGON_MUMBAI:
            return "0x687A35968F3861671F12d10c27f937C30e2FF0fA"; // "0xd4859b8641Ebea7948Ea9A00bc4990D8430bA92d";
        case ChainID.AVALANCHE_MAINNET:
            return "";
        case ChainID.AVALANCHE_FUJI:
            return "0x1AEE14730d6d9bB52d400B23F08c0E8FAB3a0388";
        default:
            return "";
    }
};