import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowLeft, PieChart as PieIcon, MessageSquareText } from "lucide-react";
declare var route: any;
const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function Analytics({ survey, total, charts }: any) {
  return (
    <AppLayout>
      <Head title={`Analytics - ${survey.title}`} />
      <div className="p-8 max-w-5xl mx-auto space-y-8 text-white">
        <div className="flex flex-col gap-4">
          <Link href={route('survey-runs.index')} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors w-fit">
            <ArrowLeft size={16} /> Back to Surveys
          </Link>
          <h1 className="text-4xl font-black">{survey.title}</h1>
          <p className="text-slate-400">Total Sample: <span className="text-white font-bold">{total} responses</span></p>
        </div>

        <div className="grid gap-8">
          {charts.map((chart: any, index: number) => (
            <Card key={index} className="bg-[#0c0c0e] border-white/5 rounded-[2.5rem] p-4 overflow-hidden">
              <CardHeader>
                <CardTitle className="text-white text-xl flex items-center gap-3">
                  <PieIcon className="text-indigo-500" size={20} />
                  {chart.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chart.data} layout="vertical" margin={{ left: 40, right: 40 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={12} width={120} tickLine={false} axisLine={false} />
                      <Tooltip
                        cursor={{ fill: '#ffffff05' }}
                        contentStyle={{ backgroundColor: '#0c0c0e', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32}>
                        {chart.data.map((entry: any, i: number) => (
                          <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {chart.other_responses.length > 0 && (
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-2 text-slate-400 mb-4 text-sm font-bold uppercase tracking-wider">
                      <MessageSquareText size={16} />
                      Qualitative "Other" Feedback
                    </div>
                    <div className="grid gap-2">
                      {chart.other_responses.map((text: string, i: number) => (
                        <div key={i} className="text-sm text-slate-300 py-2 px-4 bg-[#0c0c0e] rounded-xl border border-white/5">
                          "{text}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {charts.length === 0 && (
            <div className="text-center py-20 bg-[#0c0c0e] rounded-[3rem] border border-dashed border-white/10">
              <p className="text-slate-500 italic">No quantitative charts available for this survey structure.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}