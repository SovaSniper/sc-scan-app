import { getAPI } from "../constant/api";
import { getAPIKey } from "../constant/apiKey";

/**
 * Given contract address, get contract ABI from explorer
 * @param contractAddress 
 * @param network 
 * @returns if unverified, return empty object
 */
export const onChainABI = async (contractAddress: string, network: string) => {
    const response = await fetch(`${getAPI(network)}/api?module=contract&action=getabi&address=${contractAddress}&apikey=${getAPIKey(network)}`);
    const data = await response.json();
    if (data.status === "0") {
        console.log(data.result);  // error message
        return null;
    }

    try {
        const contractABI = JSON.parse(data.result);
        return contractABI;
    }
    catch (e) {
        console.log(e);
        return null;
    }
}