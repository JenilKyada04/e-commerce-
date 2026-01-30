
import {  Search, ShoppingCart } from "lucide-react";
import { useQueryState } from 'nuqs'
import { NotificationPopover } from './notificationPopover';
import { AdminPopover } from './adminPopover';
import Link from 'next/link';

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

                <Link href={"/checkout"} >
                    <ShoppingCart />
                </Link>
                <NotificationPopover />
                <AdminPopover />
            </div>
        </div>
    )
}

export default Navrightside
