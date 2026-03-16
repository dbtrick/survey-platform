import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList, Legend } from "recharts";
import { ArrowLeft, Users, Calendar, Zap, BarChart3 } from "lucide-react";

declare var route: any;

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'];

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

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Sample" value={stats.total} icon={<Users size={20} className="text-indigo-500" />} subText="Total responses collected" />
          <StatCard title="New Today" value={stats.new_today} icon={<Zap size={20} className="text-amber-500" />} subText="Received since midnight" />
          <StatCard title="Avg per Day" value={stats.avg_per_day} icon={<Calendar size={20} className="text-emerald-500" />} subText="Daily submission rate" />
          <StatCard title="Completion" value={`${stats.completion_rate}%`} icon={<BarChart3 size={20} className="text-sky-500" />} subText="Successful submissions" />
        </div>

        {/* Main Trend Chart */}
        <Card className="bg-[#0c0c0e] border-white/5 rounded-[2rem]">
          <CardHeader>
            <CardTitle className="text-white text-lg">Response Timeline</CardTitle>
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
            <Card key={i} className={`bg-[#0c0c0e] border-white/5 rounded-[2rem] ${q.type === 'grid_stacked' ? 'lg:col-span-2' : ''}`}>
              <CardHeader>
                <CardTitle className="text-white text-sm font-medium leading-relaxed">{q.question}</CardTitle>
              </CardHeader>
              <CardContent className={q.type === 'grid_stacked' ? 'h-[400px]' : 'h-[250px]'}>
                <ResponsiveContainer width="100%" height="100%">
                  {q.type === 'grid_stacked' ? (
                    <BarChart data={q.data} layout="vertical" margin={{ left: 40, right: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={true} vertical={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="row" type="category" stroke="#94a3b8" fontSize={11} width={120} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#0c0c0e', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                      {q.options.map((option: string, index: number) => (
                        <Bar key={option} dataKey={option} stackId="a" fill={COLORS[index % COLORS.length]} barSize={30}>
                          <LabelList dataKey={option} position="center" content={(props: any) => {
                            const { x, y, width, value } = props;
                            return value > 0 ? <text x={x + width / 2} y={y + 18} fill="#fff" fontSize={10} textAnchor="middle">{value}</text> : null;
                          }} />
                        </Bar>
                      ))}
                    </BarChart>
                  ) : (
                    <BarChart data={q.data} layout="vertical" margin={{ left: 20, right: 40 }}>
                      <XAxis type="number" hide domain={[0, 'dataMax + 1']} />
                      <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} width={100} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#0c0c0e', border: '1px solid #ffffff10', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20} isAnimationActive={true}>
                        {q.data.map((_: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
                        ))}
                        <LabelList dataKey="value" position="right" style={{ fill: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }} />
                      </Bar>
                    </BarChart>
                  )}
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