import { ChainID } from "./chainID";

/**
 * Converts a network name to a more readable format
 * @param network 
 * @returns 
 */
export const getNetworkName = (network: string) => {
    const networkName = network.split('_').map((word) => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
    return networkName;
}

export const getNetworkNameFromChainID = (chainId: string) => {
    switch (chainId) {
        case ChainID.ETHEREUM_MAINNET:
            return "Etheruem Mainnet";
        case ChainID.ETHEREUM_GOERLI:
            return "Etheruem Goerli";
        case ChainID.ETHEREUM_SEPOLIA:
            return "Etheruem Seoplia";
        case ChainID.POLYGON_MAINNET:
            return "Polygon Mainnet";
        case ChainID.POLYGON_MUMBAI:
            return "Polygon Mumbai";
        case ChainID.AVALANCHE_MAINNET:
            return "Avalanche Mainnet";
        case ChainID.AVALANCHE_FUJI:
            return "Avalanche Testnet";
        case ChainID.FANTOM_MAINNET:
            return "Fantom Mainnet";
        case ChainID.FANTOM_TESTNET:
            return "Fantom Testnet";
        default:
            return "";
    }
}

export const getChainIdFromNetwork = (network: string): string => {
    let chainId: string = "";
    const match = Object.entries(ChainID).find(([key, _]) => key === network);
    if (match && match.length > 1) chainId = match[1];
    return chainId;
}

export const getIconByChainName = (chainName: string): string => {
    let chainId: string = getChainIdFromNetwork(chainName);
    return getIconByChainId(chainId);
}

export const getIconByChainId = (chainId: string): string => {
    switch (chainId) {
        case ChainID.ETHEREUM_MAINNET:
        case ChainID.ETHEREUM_GOERLI:
        case ChainID.ETHEREUM_SEPOLIA:
            return "https://www.ankr.com/rpc/static/media/eth.4ca298ae.svg";
        case ChainID.POLYGON_MAINNET:
        case ChainID.POLYGON_MUMBAI:
            return "https://www.ankr.com/rpc/static/media/polygon-zkevm.8c6d01fe.svg";
        case ChainID.AVALANCHE_FUJI:
        case ChainID.AVALANCHE_MAINNET:
            return "https://www.ankr.com/rpc/static/media/avax.04d124b0.svg";
        case ChainID.FANTOM_MAINNET:
        case ChainID.FANTOM_TESTNET:
            return "https://www.ankr.com/rpc/static/media/ftm.c92e9c29.svg";
        default:
            return "";
    }
};