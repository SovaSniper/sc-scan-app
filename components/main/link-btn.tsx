"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import Link from "next/link"

interface LinkBtnProps
    extends React.HTMLAttributes<HTMLDivElement> {
        link?: string;
    icon: JSX.Element;
    content?: string;
}

export const LinkBtn = ({ link, icon, onClick, content }: LinkBtnProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                {link
                    ? <Link href={link} target="_blank" >
                        <div className="p-2 hover:bg-grayscale-100 rounded-md">
                            {icon}
                        </div>
                    </Link>
                    : <div className="p-2 hover:bg-grayscale-100 rounded-md" onClick={onClick}>
                        {icon}
                    </div>
                }
            </HoverCardTrigger>
            <HoverCardContent>
                {content || ""}
            </HoverCardContent>
        </HoverCard>
    )
}
