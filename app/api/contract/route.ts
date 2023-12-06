import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { BACKEND_API, IPFS_GATEWAY } from "@/lib/utils";
import { ABIError, ABIResponse } from "@/lib/api/abi-interface";
import { SCScanOracle } from "@/lib/sc-scan/sc-scan-oracle";

export async function GET(request: NextRequest) {
    const contractAddress: string = request.nextUrl.searchParams.get("contract") || "";
    const selectedNetwork: string = request.nextUrl.searchParams.get("network") || "";
    if (ethers.utils.isAddress(contractAddress) === false) {
        return NextResponse.json({ detail: "Invalid Contract" }, { status: 404 })
    }

    // Attempt to get information from on chain oracle
    const oracle = new SCScanOracle(selectedNetwork);
    let cid: string = await oracle.abiInformation(contractAddress);

    console.log(`Getting ABI from ${cid ? "On Chain" : "API"}`)
    if (!cid) {
        // If contract data isn't on chain then call off chain version and let backend save on chain using oracle
        console.log(`${BACKEND_API}/api/abi?contract=${contractAddress}&network=${selectedNetwork}`)
        const response = await fetch(`${BACKEND_API}/api/abi?contract=${contractAddress}&network=${selectedNetwork}`)
        if (!response.ok) {
          let data: ABIError = await response.json();
          const msg = data.detail || "Frontend error"
          return NextResponse.json({ detail: msg }, { status: 404 });
        }
        const data: ABIResponse = await response.json();
        try {
            console.log(`Calling oracle to save ABI on chain`)
            oracle.request(contractAddress);
        } catch (e) {
            console.error(e);
        }
        return NextResponse.json({ ...data });
    }

    const response = fetch(`${IPFS_GATEWAY}/${cid}`);
    const data: ABIResponse = await (await response).json()

    return NextResponse.json({ ...data, onChainCID: cid });
}