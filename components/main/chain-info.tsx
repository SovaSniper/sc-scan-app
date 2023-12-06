"use client";

import { getIconByChainId, getNetworkNameFromChainID } from "@/lib/constant/icon";
import { getContractOracle } from "@/lib/sc-scan/get_contract";
import { Button } from "@/components/ui/button";
import { getExplorer } from "@/lib/constant/explorers";
import Link from "next/link";
import { SCScanOracle } from "@/lib/sc-scan/sc-scan-oracle";
import { useEffect, useState } from "react";

interface ChainInfoProps
    extends React.HTMLAttributes<HTMLDivElement> {
    network: string;
}

export const ChainInfo = ({ network }: ChainInfoProps) => {
    const [totalABIInformation, setTotal] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const oracle = new SCScanOracle(network);
            const totalABIInformation = await oracle.totalABIInformation();
            console.log(totalABIInformation)
            setTotal(totalABIInformation || 0)
        })()
    }, []);

    const networkName = getNetworkNameFromChainID(network);
    const oracleAddress = getContractOracle(network);
    const icon = getIconByChainId(network);
    return (
        <div className="p-4 rounded-2xl bg-grayscale-025">
            <div className="flex justify-between ">
                <h2 className="font-bold">{networkName}</h2>
                <img src={icon} className="w-10 h-10" />
            </div>
            <div>
                Total Scanned: {totalABIInformation}
            </div>
            {oracleAddress
                ? <Button asChild>
                    <Link href={`${getExplorer(network)}/address/${oracleAddress}`} target="_blank">
                        {oracleAddress}
                    </Link>
                </Button>
                : <Button disabled={!oracleAddress}>
                    Coming Soon!
                </Button>}
        </div>
    )
}
