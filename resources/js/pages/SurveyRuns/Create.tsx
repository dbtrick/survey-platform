import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import SurveyBuilder from "@/components/survey-builder/survey-builder"

export default function CreateSurveyRun() {
  return (
    <AppLayout>

      <Head title="Create Survey Run" />

      <div className="p-6 max-w-4xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold">
          Create Survey Run
        </h1>

        <SurveyBuilder />

      </div>

    </AppLayout>
  )
}