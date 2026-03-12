import AppLayout from "../../resources/js/layouts/app-layout"
import { Head, Link } from "@inertiajs/react"
import { Button } from "../../resources/js/components/ui/button"
import { FileDown, Table, FileText, ArrowLeft, Info } from "lucide-react"

declare var route: any;

export default function ExportShow({ survey }: any) {
  // We use window.location.href because Inertia should NOT 
  // intercept a binary file download
  const handleDownload = (format: string) => {
    window.location.href = route('exports.download', {
      survey: survey.id,
      format: format
    });
  };

  return (
    <AppLayout>
      <Head title={`Export - ${survey.title}`} />
      <div className="p-8 max-w-5xl mx-auto space-y-10 text-white">
        <div className="flex flex-col gap-4">
          <Link href={route('survey-runs.index')} className="text-slate-500 hover:text-white flex items-center gap-2 text-sm transition-colors w-fit">
            <ArrowLeft size={16} /> Back to Surveys
          </Link>
          <h1 className="text-4xl font-black tracking-tight">{survey.title}</h1>
          <div className="flex items-center gap-2 text-slate-400">
            <Info size={16} />
            <span>Ready to export {survey.responses_count} total responses.</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Excel Card */}
          <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-green-500/30 transition-all group">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
                <Table size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Microsoft Excel</h3>
                <p className="text-slate-500 mt-2 leading-relaxed">
                  Best for general data cleaning and manual analysis. Includes formatting and multiple sheets support.
                </p>
              </div>
            </div>
            <Button onClick={() => handleDownload('xlsx')} className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white rounded-2xl h-14 font-bold">
              Download .xlsx
            </Button>
          </div>

          {/* CSV Card */}
          <div className="bg-[#0c0c0e] border border-white/5 p-8 rounded-[2.5rem] flex flex-col justify-between hover:border-indigo-500/30 transition-all">
            <div className="space-y-6">
              <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">CSV / Raw Data</h3>
                <p className="text-slate-500 mt-2 leading-relaxed">
                  Lightweight format compatible with Python, R, and SPSS. Best for large datasets.
                </p>
              </div>
            </div>
            <Button onClick={() => handleDownload('csv')} className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 font-bold">
              Download .csv
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}