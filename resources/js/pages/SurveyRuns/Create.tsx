import AppLayout from "@/layouts/app-layout"
import { Head, router, usePage } from "@inertiajs/react"
import SurveyBuilder from "@/components/survey-builder/survey-builder"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Rocket, Copy, Check } from "lucide-react"

// Ensure TypeScript doesn't panic
declare var route: any;

export default function CreateSurveyRun() {
  // 1. Use optional chaining to prevent "Cannot read property of undefined" errors
  const props = usePage().props as any;
  const flash = props.flash || {};

  const [title, setTitle] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSave = (blocks: any[]) => {
    if (!title.trim()) {
      alert("Please enter a survey title first!");
      return;
    }

    // 2. Wrap in a try/catch if you're worried about Ziggy not being loaded
    try {
      router.post(route('surveys.store'), {
        title: title,
        blocks: blocks
      });
    } catch (e) {
      console.error("Route helper failed:", e);
      alert("Application Error: Route helper not found.");
    }
  };

  const copyToClipboard = () => {
    if (flash.generated_link) {
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
            <h1 className="text-3xl font-bold tracking-tight">Create Survey</h1>
            <p className="text-muted-foreground text-sm">Design your survey below.</p>
          </div>
          <Input
            placeholder="Survey Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-64"
          />
        </div>

        {flash.generated_link && (
          <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl flex items-center justify-between">
            <span className="text-sm font-mono">{flash.generated_link}</span>
            <Button onClick={copyToClipboard} variant="outline" size="sm">
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </Button>
          </div>
        )}

        <SurveyBuilder onSave={handleSave} />
      </div>
    </AppLayout>
  );
}