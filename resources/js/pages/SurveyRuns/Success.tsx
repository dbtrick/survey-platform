import { Head } from "@inertiajs/react"
import { CheckCircle2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Success() {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-6">
      <Head title="Submission Successful" />

      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full" />
          <CheckCircle2 size={80} className="text-green-500 relative z-10 mx-auto" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">Thank You!</h1>
          <p className="text-slate-400 leading-relaxed">
            Your responses have been recorded successfully. We appreciate your time and feedback.
          </p>
        </div>

        <div className="pt-4">
          <Button
            variant="outline"
            className="rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white gap-2"
            onClick={() => window.location.href = '/'}
          >
            <Home size={18} />
            Return Home
          </Button>
        </div>

        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
          ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </p>
      </div>
    </div>
  )
}