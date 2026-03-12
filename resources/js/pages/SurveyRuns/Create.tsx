import AppLayout from "@/layouts/app-layout"
import { Head, router, usePage } from "@inertiajs/react"
import SurveyBuilder from "@/components/survey-builder/survey-builder"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Rocket, Copy, Check } from "lucide-react"

declare var route: any;

export default function CreateSurveyRun() {
  // Correctly pull flash from props (provided by the middleware above)
  const { flash } = usePage().props as any;

  const [title, setTitle] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSave = (blocks: any[]) => {
    if (!title.trim()) {
      alert("Please enter a survey title first!");
      return;
    }

    router.post(route('surveys.store'), {
      title: title,
      blocks: blocks
    }, {
      onSuccess: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  const copyToClipboard = () => {
    if (flash?.generated_link) {
      navigator.clipboard.writeText(flash.generated_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AppLayout>
      <Head title="Create Survey Run" />
      <div className="p-8 w-full space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Create Survey</h1>
            <p className="text-muted-foreground text-sm">Design your survey and generate a public link.</p>
          </div>
          <Input
            placeholder="Survey Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-64 bg-background"
          />
        </div>

        {/* Display the link if it exists in flash props */}
        {flash?.generated_link && (
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center gap-3">
              <Rocket className="text-green-500 w-5 h-5" />
              <div>
                <p className="text-[10px] font-black uppercase text-green-500">Live Link Generated</p>
                <p className="text-sm font-mono text-white">{flash.generated_link}</p>
              </div>
            </div>
            <Button onClick={copyToClipboard} variant="outline" size="sm" className="gap-2">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        )}

        <SurveyBuilder onSave={handleSave} />
      </div>
    </AppLayout>
  );
}