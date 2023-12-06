"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from "next/image";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { ChainID } from "@/lib/constant/chainID"
import { getIconByChainId, getNetworkNameFromChainID } from "@/lib/constant/icon"
import { useState } from "react";

export const DEFAULT_NETWORK = ChainID.POLYGON_MUMBAI;

const frameworks: {
    value: string;
    label: string;
    disabled?: boolean;
}[] = [
        {
            value: ChainID.POLYGON_MAINNET,
            label: "Polygon",
        },
        {
            value: ChainID.POLYGON_MUMBAI,
            label: "Polygon Mumbai",
        },
        {
            value: ChainID.ETHEREUM_MAINNET,
            label: "Ethereum",
        },
        {
            value: ChainID.ETHEREUM_GOERLI,
            label: "Ethereum Georli",
        },
        {
            value: ChainID.ETHEREUM_SEPOLIA,
            label: "Ethereum Sepolia",
        },
        {
            value: ChainID.AVALANCHE_FUJI,
            label: "Avalanche Fuji",
        },
        {
            value: ChainID.AVALANCHE_MAINNET,
            label: "Avalanche Mainnet",
        },
    ]

interface SelectNetworkBtnProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setParentValue?: Function;
}

export const SelectNetworkBtn = ({ setParentValue }: SelectNetworkBtnProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(DEFAULT_NETWORK);

    const handleSelect = (currentValue: string) => {
        setValue(currentValue);
        setOpen(false);
        if (setParentValue) {
            setParentValue(currentValue);
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? frameworks.find((framework) => framework.value === value)?.label
                        : "Select framework..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                className={`${framework.disabled && "cursor-not-allowed text-gray-400"}`}
                                disabled={framework.disabled || false}
                                key={framework.value}
                                value={framework.value}
                                onSelect={handleSelect}
                            >
                                <Image
                                    width={50} height={50}
                                    alt={getNetworkNameFromChainID(framework.value)}
                                    src={getIconByChainId(framework.value)}
                                    className="mr-2 h-4 w-4" />
                                {getNetworkNameFromChainID(framework.value)}
                                {framework.disabled && `(Coming soon)`}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
