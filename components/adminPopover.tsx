import { User, Settings, Bell, LogOut } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export function AdminPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer rounded-md px-2 py-1 hover:bg-muted">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted ring-1 ring-border">
            <User className="h-4 w-4" />
          </div>
          <span className="hidden sm:block text-sm font-medium">
            Admin
          </span>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-64 rounded-xl border bg-gray-200 p-0 shadow-lg"
      >
        <div className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Admin User</p>
            <p className="text-xs text-muted-foreground">
              admin@dashboard.com
            </p>
          </div>
        </div>

        <Separator />

        <div className="p-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <User className="h-4 w-4" />
            Profile
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>

          <Button variant="ghost" className="w-full justify-start gap-2 ">
            <Bell className="h-4 w-4" />
            Notifications
          </Button>
        </div>

        <Separator />

        <div className="p-2">
          <Button
            variant="destructive"
            className="w-full justify-start gap-2">

            <LogOut className="h-4 w-4 " />
            <div onClick={() => window.location.href = "https://www.google.com"} className="cursor-pointer">
              Logout
            </div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
