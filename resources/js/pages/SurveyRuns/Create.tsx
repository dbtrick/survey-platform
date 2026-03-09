import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import SurveyBuilder from "@/components/survey-builder/survey-builder"

export default function CreateSurveyRun() {
  return (
    <AppLayout>
      <Head title="Create Survey Run" />

      {/* Changed max-w-4xl to max-w-[1400px] to accommodate two columns */}
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col space-y-2 border-b pb-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Survey Run
          </h1>
          <p className="text-muted-foreground">
            Configure your questions on the left and see the real-time result on the right.
          </p>
        </div>

        <SurveyBuilder />
      </div>
    </AppLayout>
  )
}