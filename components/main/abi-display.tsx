"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import { ABIInterface } from "@/lib/api/abi-interface";
import { Badge } from "@/components/ui/badge";
import { BACKEND_API } from "@/lib/utils";
import { Button } from "../ui/button";
import ReactSyntaxHighlighter from "react-syntax-highlighter";
import atomOneLight from "react-syntax-highlighter/dist/esm/styles/hljs/atom-one-light";

interface ABIDisplayProps
    extends React.HTMLAttributes<HTMLDivElement> {
    abi: ABIInterface[];
    verified?: boolean;
    predictState?: boolean;
}

export const ABIDisplay = ({ abi, verified, predictState }: ABIDisplayProps) => {
    const [selectedSignature, setSelectedSignature] = useState<ABIInterface>({} as ABIInterface);
    const [data, setData] = useState<ABIInterface[]>([]);

    useEffect(() => {
        if (abi.length > 0) {
            setSelectedSignature(abi[0]);
            setData(abi);
        }
    }, [abi]);

    const handleSelect = async (signature: string) => {
        const selected = data.find(x => x.signature === signature);
        if (!selected) {
            return;
        }

        console.log(selected)
        if (predictState && !selected.stateMutability) {
            setSelectedSignature({ ...selected, stateMutability: "Predicting..." });
            const response = await fetch(`${BACKEND_API}/api/state`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    abi: selectedSignature,
                }),
            });

            const data = await response.json();
            selected.stateMutability = data.stateMutability;
        }
        console.log(selected)
        setSelectedSignature(selected);
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-3 p-4 max-h-screen overflow-y-scroll">
                {abi.map((fn, i) => {
                    return (
                        <div key={i} className="text-center my-2 py-2 rounded-md cursor-pointer bg-grayscale-100 hover:bg-grayscale-200" onClick={() => handleSelect(fn.signature)}>
                            <code>{fn.name}</code>
                        </div>
                    )
                })}
            </div>
            <div className="col-span-12 md:col-span-9 p-4">
                <h2 className="text-3xl font-bold tracking-tight py-1 break-words">{selectedSignature.name} (<code>{selectedSignature.signature}</code>)</h2>
                {selectedSignature.stateMutability &&
                    <Button>
                        {selectedSignature.stateMutability || ""}{" "}{!verified && "(predicted)"}
                    </Button>}
                <Table className="my-8">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Type</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(selectedSignature.inputs || []).map((input, i) => {
                            return (
                                <TableRow key={i} className="py-2">
                                    <TableCell className="font-bold">{input.name}</TableCell>
                                    <TableCell>{input.type}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <ReactSyntaxHighlighter
                    className="!bg-transparent bg-spot"
                    showLineNumbers={true}
                    language={"json"}
                    style={atomOneLight}>
                    {JSON.stringify(selectedSignature, null, 2)}
                </ReactSyntaxHighlighter>
                {/* {JSON.stringify(selectedSignature.inputs)} */}
            </div>
        </div>
    )
}
