import React from 'react'

import { Bell, Search, User } from "lucide-react";
import { useQueryState } from 'nuqs'

function Navrightside() {

    const [name, setName] = useQueryState('search')
    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-primary">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={name || ''} onChange={e => setName(e.target.value)}
                        placeholder="Search..."
                        className="md:w-48 w-24 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                </div>

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
        </div>
    )
}

export default Navrightside
