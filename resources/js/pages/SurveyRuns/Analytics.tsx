import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowLeft, Users, Calendar, Zap, BarChart3 } from "lucide-react";

declare var route: any;

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6'];

export default function Analytics({ survey, stats, chartData, questionCharts }: any) {
  return (
    <AppLayout>
      <Head title={`Insights - ${survey.title}`} />
      <div className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <Link href={route('survey-runs.index')} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm mb-4">
              <ArrowLeft size={16} /> Back to Surveys
            </Link>
            <h1 className="text-3xl font-bold text-white tracking-tight">{survey.title}</h1>
            <p className="text-slate-400 font-mono text-sm uppercase">Survey ID: {survey.id}</p>
          </div>
        </div>

        {/* 4 Cards (Mirroring Platform Overview) */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Sample" value={stats.total} icon={<Users size={20} className="text-indigo-500" />} subText="Total responses collected" />
          <StatCard title="New Today" value={stats.new_today} icon={<Zap size={20} className="text-amber-500" />} subText="Received since midnight" />
          <StatCard title="Avg per Day" value={stats.avg_per_day} icon={<Calendar size={20} className="text-emerald-500" />} subText="Daily submission rate" />
          <StatCard title="Completion" value={`${stats.completion_rate}%`} icon={<BarChart3 size={20} className="text-sky-500" />} subText="Successful submissions" />
        </div>

        {/* Main Trend Chart (The "Information about selected survey") */}
        <Card className="bg-[#0c0c0e] border-white/5 rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-white text-lg">Response Timeline</CardTitle>
            <CardDescription>How this specific survey performed over time.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
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
                <Tooltip contentStyle={{ backgroundColor: '#0c0c0e', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="responses" stroke="#6366f1" strokeWidth={3} fill="url(#colorRes)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Individual Question Insights */}
        <div className="grid gap-6 lg:grid-cols-2">
          {questionCharts.map((q: any, i: number) => (
            <Card key={i} className="bg-[#0c0c0e] border-white/5 rounded-[2rem]">
              <CardHeader>
                <CardTitle className="text-white text-sm font-medium leading-relaxed">{q.question}</CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={q.data} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={80} />
                    <Tooltip contentStyle={{ backgroundColor: '#0c0c0e', border: '1px solid #ffffff10', borderRadius: '12px' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                      {q.data.map((_: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function StatCard({ title, value, icon, subText }: any) {
  return (
    <Card className="bg-[#0c0c0e] border-white/5 rounded-[2rem]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</CardTitle>
        <div className="p-2 bg-white/5 rounded-xl">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white">{value}</div>
        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{subText}</p>
      </CardContent>
    </Card>
  );
}