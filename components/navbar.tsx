"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import Navrightside from "./navrightside";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Navbar() {

    return (
        <div className="flex h-16 items-center justify-between border-b bg-background px-6">

            <div className="flex items-center gap-2 cursor-pointer">
                <SidebarTrigger className="cursor-pointer" />
            </div>

            {/* <Tooltip>
                <TooltipTrigger><SidebarTrigger className="cursor-pointer" /></TooltipTrigger>
                <TooltipContent>
                    <p>Add to library</p>
                </TooltipContent>
            </Tooltip>

            <Navrightside /> */}

        </div>
    );
}
