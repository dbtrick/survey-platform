import AppLayout from "@/layouts/app-layout"
import { Head, Link } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { FileDown, ChevronRight, MousePointer2 } from "lucide-react"

declare var route: any;

export default function ExportIndex({ surveys }: any) {
  return (
    <AppLayout>
      <Head title="Export Data" />
      <div className="p-8 max-w-5xl mx-auto space-y-8 text-white">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Export Center</h1>
          <p className="text-slate-400 mt-2">Select a survey to download responses in Excel or CSV format.</p>
        </div>

        <div className="grid gap-4">
          {surveys.map((survey: any) => (
            <Link
              key={survey.id}
              href={route('exports.show', survey.id)}
              className="group bg-[#0c0c0e] border border-white/5 p-6 rounded-[2rem] hover:border-green-500/30 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                  <FileDown size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-green-400 transition-colors">{survey.title}</h3>
                  <div className="flex items-center gap-3 text-slate-500 text-sm mt-1">
                    <span className="flex items-center gap-1">
                      <MousePointer2 size={14} /> {survey.responses_count} responses
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-slate-700 group-hover:text-white transition-colors" />
            </Link>
          ))}

          {surveys.length === 0 && (
            <div className="text-center py-20 bg-[#0c0c0e] rounded-[2rem] border border-dashed border-white/10 text-slate-500">
              No surveys available for export.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}