import { NextRequest } from "next/server";
import Web3 from "web3";
import { ChainID } from "@/lib/constant/chainID";

export interface QueryParams {
    contractAddress: string;
    network: string;
}

export const handleRequestRequirements = async (request: NextRequest): Promise<QueryParams> => {
    const contractAddress: string = request.nextUrl.searchParams.get("contract") || "";
    const network: string = request.nextUrl.searchParams.get("network") || "";

    return { contractAddress, network };
}

export const getByteCode = async (contractAddress: string, rpcUrl: string): Promise<string> => {
    const web3 = new Web3(rpcUrl);

    let bytecode: string = await web3.eth.getCode(contractAddress);
    // console.log("Bytecode: ", bytecode);

    if (bytecode === '0x') return '';
    if (bytecode.startsWith('0x')) return bytecode.slice(2);
    return '';
}