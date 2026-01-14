import { AppSidebar } from "@/components/dashboard/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0f0518]">
      <div className="hidden md:flex flex-shrink-0">
          <AppSidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <main className="flex-1 p-6 md:p-8">
            {children}
        </main>
      </div>
    </div>
  )
}
