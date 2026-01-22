
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <Suspense fallback={<div className="p-6 m-3 text-4xl">Loading dashboard...</div>}>

        <SidebarProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            <AppSidebar />

            <div className="flex flex-1 flex-col">
              <Navbar />

              <main className="flex-1 w-full overflow-y-auto bg-muted/40 p-3 md:p-6">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
    </Suspense>

  );
}
