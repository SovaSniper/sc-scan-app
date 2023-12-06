"use client";

import { BACKEND_SUMMARY_API } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ContractSummaryProps
    extends React.HTMLAttributes<HTMLDivElement> {
    contract: string;
    network: string;
    trigger: boolean;
}

export const ContractSummary = ({ contract, network, trigger }: ContractSummaryProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataSummary, setDataSummary] = useState<string>("");

    const readChunks = (reader: any) => {
        return {
          async*[Symbol.asyncIterator]() {
            let readResult = await reader.read();
            while (!readResult.done) {
              yield readResult.value;
              readResult = await reader.read();
            }
          },
        };
      }

    useEffect(() => {
        (async () => {
            if (!trigger) return;

            // Generate AI summary
            setDataSummary("");
            fetch(`${BACKEND_SUMMARY_API}/api/summary?contract=${contract}&network=${network}`,
              { method: 'POST' })
              .then(async (response: any) => {
                // response.body is a ReadableStream
                const reader = response.body.getReader();
                for await (const chunk of readChunks(reader)) {
                  const result = String.fromCharCode(...chunk);
                  // console.log(`results ${result}`);
                  setDataSummary((old) => old + result);
                }
                console.log("Finished generating summary")
              })
        })()
    }, [trigger])
    return (
        <div className="h-64 pl-4 py-2 rounded-2xl bg-grayscale-025 my-4">
            <div className="font-medium leading-none py-2">
                AI Summary
            </div>
            <div className="h-52 py-2 pl-4 overflow-y-scroll overflow-x-hidden">
                {isLoading && <div>Generating AI summary...</div>}
                {dataSummary && dataSummary}
            </div>
        </div>
    )
}
