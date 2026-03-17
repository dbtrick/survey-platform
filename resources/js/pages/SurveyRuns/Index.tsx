import AppLayout from "@/layouts/app-layout"
import { Head, Link, router } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import { BarChart3, Download, ExternalLink, MousePointer2, Trash2, Plus, LayoutList } from "lucide-react"

declare var route: any;

export default function SurveyIndex({ surveys }: any) {
  const handleDelete = (id: number) => {
    if (confirm("Are you sure? This will delete all collected responses for this survey.")) {
      router.delete(route('surveys.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="My Surveys" />
      <div className="p-8 w-full max-w-7xl mx-auto space-y-8 text-foreground">

        {/* Sharp Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary mb-1">
              <LayoutList size={16} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">Management</span>
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight text-foreground">Active Surveys</h1>
            <p className="text-muted-foreground font-sans">Track responses and manage your survey architecture.</p>
          </div>

          <Link href={route('survey-runs.create')} className="cursor-pointer">
            <Button className="bg-primary text-primary-foreground hover:opacity-90 h-11 px-6 rounded-xl shadow-sm transition-all gap-2 font-bold cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <Plus size={18} />
              Create New Survey
            </Button>
          </Link>
        </div>

        {/* Surveys Grid */}
        <div className="grid gap-6">
          {surveys.map((survey: any) => (
            <div
              key={survey.id}
              className="group bg-card border border-border p-6 rounded-[1.5rem] hover:border-primary/40 transition-all shadow-2xs hover:shadow-md duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors tracking-tight">
                    {survey.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-mono font-bold border border-primary/20">
                      <MousePointer2 size={12} />
                      {survey.responses_count} Responses
                    </div>
                    <span className="text-xs text-muted-foreground font-medium font-mono bg-muted/30 px-3 py-1 rounded-full">
                      Created: {new Date(survey.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Public Link Icon */}
                  <a
                    href={route('surveys.public_show', survey.slug)}
                    target="_blank"
                    className="p-3 text-muted-foreground hover:text-primary transition-colors bg-secondary/50 rounded-xl border border-border cursor-pointer hover:bg-secondary/80"
                    title="View Public Survey"
                  >
                    <ExternalLink size={18} />
                  </a>

                  {/* Analytics Button */}
                  <Link href={route('survey-runs.analytics', survey.id)} className="cursor-pointer">
                    <Button variant="outline" className="h-11 rounded-xl border-border bg-background hover:bg-accent hover:text-accent-foreground text-foreground gap-2 transition-all font-semibold cursor-pointer">
                      <BarChart3 size={18} />
                      Analytics
                    </Button>
                  </Link>

                  {/* Export Button */}
                  <Link href={route('exports.show', survey.id)} className="cursor-pointer">
                    <Button variant="secondary" className="h-11 rounded-xl bg-secondary text-secondary-foreground hover:opacity-80 gap-2 border border-border transition-all font-semibold cursor-pointer">
                      <Download size={18} />
                      Export
                    </Button>
                  </Link>

                  {/* Delete Button */}
                  <Button
                    onClick={() => handleDelete(survey.id)}
                    variant="ghost"
                    className="h-11 w-11 p-0 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all cursor-pointer"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {surveys.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-border rounded-[2rem] text-muted-foreground bg-muted/5">
              <div className="p-4 bg-muted/20 rounded-full mb-4">
                <BarChart3 size={40} className="opacity-20" />
              </div>
              <p className="text-lg font-medium">No surveys created yet.</p>
              <Link href={route('survey-runs.create')} className="mt-2 text-primary font-bold hover:underline cursor-pointer">
                Start your first project
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}