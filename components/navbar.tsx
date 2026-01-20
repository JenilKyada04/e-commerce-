"use client";

import { Bell, Search, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";


export default function Navbar() {
    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-6">


            <div className="flex items-center gap-2 cursor-pointer">
                <SidebarTrigger className="cursor-pointer" />
            </div>

            <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-primary">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-48 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
            </div>




            <div className="flex items-center gap-4">
                <button className="relative">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                </button>

                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium">Admin</span>
                </div>
            </div>
        </header>
    );
}
