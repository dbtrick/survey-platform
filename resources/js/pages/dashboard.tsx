import { useEffect, useState } from 'react';
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, ClipboardList, Zap, TrendingUp } from "lucide-react";

declare var route: any;

export default function Dashboard({ stats, chartData, filters }: any) {
  const [mounted, setMounted] = useState(false); // 2. Add state

  useEffect(() => {
    setMounted(true); // 3. Set to true once the browser loads
  }, []);

  const handleFilterChange = (value: string) => {
    router.get(route('dashboard'), { days: value }, { preserveState: true });
  };

  return (
    <AppLayout>
      <Head title="Dashboard" />
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
            <p className="text-slate-500">Real-time platform performance metrics.</p>
          </div>
          <Select defaultValue={filters.days.toString()} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[180px] bg-[#0c0c0e] border-white/10 text-white rounded-xl">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-[#0c0c0e] border-white/10 text-white">
              <SelectItem value="7">Last 7 Days</SelectItem>
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="90">Last 3 Months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stat Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Respondents" value={stats.total_respondents.toLocaleString()} icon={<Users size={20} className="text-indigo-500" />} subText="All-time submissions" />
          <StatCard title="Active Surveys" value={stats.total_surveys} icon={<ClipboardList size={20} className="text-emerald-500" />} subText="Created survey runs" />
          <StatCard title="Responses Today" value={stats.responses_today} icon={<Zap size={20} className="text-amber-500" />} subText="Collected since midnight" />
          <StatCard title="Growth" value={`${stats.growth}%`} icon={<TrendingUp size={20} className="text-sky-500" />} subText="Change vs last period" />
        </div>

        {/* Chart Section */}
        <Card className="bg-[#0c0c0e] border-white/5 overflow-hidden rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-white">Response Activity</CardTitle>
            <CardDescription>Daily response volume trend.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full pt-4">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="date" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c0c0e', border: '1px solid #ffffff10', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="responses" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRes)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, icon, subText }: any) {
  return (
    <Card className="bg-[#0c0c0e] border-white/5 rounded-[2rem]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
        <p className="text-xs text-slate-500 mt-1">{subText}</p>
      </CardContent>
    </Card>
  );
}