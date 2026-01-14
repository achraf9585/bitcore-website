import { Wallet, Package, ShoppingCart, Activity } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    icon: Wallet,
  },
  {
    title: "Active Subscriptions",
    value: "+2350",
    change: "+180.1% from last month",
    icon: Activity,
  },
  {
    title: "Sales",
    value: "+12,234",
    change: "+19% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Active Services",
    value: "+573",
    change: "+201 since last hour",
    icon: Package,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-white/60">Overview of your activity and performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10">
            <div className="flex flex-row items-center justify-between pb-2">
              <span className="text-sm font-medium text-white/60">{stat.title}</span>
              <stat.icon className="h-4 w-4 text-white/60" />
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <p className="text-xs text-white/60 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-white">Recent Sales</h3>
            <p className="text-sm text-white/60">You made 265 sales this month.</p>
          </div>
          <div className="h-[300px] w-full bg-white/5 rounded-lg flex items-center justify-center text-white/20 border border-white/5 border-dashed">
             Chart Visualization Placeholder
          </div>
        </div>
        <div className="col-span-3 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
             <div className="mb-4">
                <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                <p className="text-sm text-white/60">Latest actions on your account.</p>
            </div>
             <div className="space-y-6">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="flex items-center gap-4">
                         <div className={`h-2 w-2 rounded-full ${i % 2 === 0 ? "bg-green-500" : "bg-primary"}`} />
                         <div className="flex-1">
                            <p className="text-sm font-medium text-white/90">
                                {i % 2 === 0 ? "Subscription renewed" : "New user registered"}
                            </p>
                            <p className="text-xs text-white/40">
                                {i === 1 ? "Just now" : `${i * 15} mins ago`}
                            </p>
                         </div>
                    </div>
                ))}
             </div>
        </div>
      </div>
    </div>
  )
}
