import AppLayout from "@/layouts/app-layout"
import { Head, Link, router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, ExternalLink, MousePointer2, Trash2 } from "lucide-react"
declare var route: any;
export default function SurveyIndex({ surveys }: any) {
  const handleDelete = (id: number) => {
    // Updated route name to match web.php
    if (confirm("Are you sure? This will delete all collected responses for this survey.")) {
      router.delete(route('surveys.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="My Surveys" />
      <div className="p-8 w-full max-w-7xl mx-auto space-y-8 text-white">
        <div className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight">Active Surveys</h1>
            <p className="text-slate-400 mt-2">Track responses and manage your survey data.</p>
          </div>
          {/* FIXED: Changed from surveys.create to survey-runs.create */}
          <Link href={route('survey-runs.create')}>
            <Button className="bg-indigo-600 hover:bg-indigo-700 h-11 px-6 rounded-xl transition-all">
              Create New Survey
            </Button>
          </Link>
        </div>

        <div className="grid gap-4">
          {surveys.map((survey: any) => (
            <div key={survey.id} className="group bg-[#0c0c0e] border border-white/5 p-6 rounded-[2rem] hover:border-indigo-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-indigo-400 transition-colors">
                    {survey.title}
                  </h3>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-bold border border-indigo-500/20">
                      <MousePointer2 size={12} />
                      {survey.responses_count} Responses
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      Created: {new Date(survey.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* FIXED: Using public show route from web.php */}
                  <a href={route('surveys.public_show', survey.slug)} target="_blank" className="p-3 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
                    <ExternalLink size={18} />
                  </a>

                  <Button variant="outline" className="h-11 rounded-xl border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2">
                    <BarChart3 size={18} />
                    Analytics
                  </Button>

                  {/* FIXED: Linking to the export options page */}
                  <Link href={route('exports.show', survey.id)}>
                    <Button className="h-11 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 gap-2">
                      <Download size={18} />
                      Export Data
                    </Button>
                  </Link>

                  <Button
                    onClick={() => handleDelete(survey.id)}
                    variant="ghost"
                    className="h-11 w-11 p-0 rounded-xl text-slate-600 hover:text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {surveys.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-[3rem] text-slate-500">
              <p className="text-lg">No surveys created yet.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}