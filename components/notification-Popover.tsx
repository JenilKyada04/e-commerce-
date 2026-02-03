
import { BellOff } from "lucide-react";
import { Bell } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function NotificationPopover() {
    return (
        <Popover>
            <PopoverTrigger asChild className="relative">
                <div className="relative">

                    <Bell className="h-5 w-5 cursor-pointer " />
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-70 mt-3 mr-3 bg-gray-200">
                <div className="grid gap-4 md:p-4 p-1">
                    <div className="flex items-center justify-center border-b pb-2">
                        <span className="text-sm font-semibold text-muted-foreground">
                            Notifications
                        </span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                        <div className="rounded-full bg-muted p-3">
                            <BellOff className="h-6 w-6 text-muted-foreground" />
                        </div>

                        <div>
                            <p className="text-sm font-medium">No notifications</p>
                            <p className="text-xs text-muted-foreground">
                                You're all caught up. We'll notify you when something arrives.
                            </p>
                        </div>
                    </div>
                </div>

            </PopoverContent>
        </Popover>
    )
}




