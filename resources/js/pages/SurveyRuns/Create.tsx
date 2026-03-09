import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import SurveyBuilder from "@/components/survey-builder/survey-builder"

export default function CreateSurveyRun() {
  return (
    <AppLayout>
      <Head title="Create Survey Run" />

      {/* Changed to w-full and px-8 for a wide-screen experience */}
      <div className="p-8 w-full space-y-6">
        <div className="flex flex-col space-y-1 border-b pb-4">
          <h1 className="text-3xl font-bold tracking-tight">Create Survey Run</h1>
          <p className="text-muted-foreground text-sm">
            Design your survey on the left and see the live result on the right.
          </p>
        </div>

        <SurveyBuilder />
      </div>
    </AppLayout>
  )
}