"use client"

import * as React from "react"
import { usePage } from "@inertiajs/react"
import {
    BookOpen,
    ChartPie,
    ChartNoAxesCombined,
    FileDown,
    ClipboardList,
    GalleryVerticalEnd,
    AudioWaveform,
    Command,
    Frame,
    PieChart,
    Map,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from "@/components/ui/sidebar"

const data = {
    user: {
        name: "Researcher",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        { name: "APVMA", logo: GalleryVerticalEnd, plan: "Enterprise" },
        { name: "HREC", logo: AudioWaveform, plan: "Startup" },
        { name: "ACQSC", logo: Command, plan: "Free" },
    ],
    projects: [
        { name: "Design Engineering", url: "#", icon: Frame },
        { name: "Sales & Marketing", url: "#", icon: PieChart },
        { name: "Travel", url: "#", icon: Map },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage()

    // Dynamically build navMain based on current URL
    const navMain = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: ChartPie,
            isActive: url === "/dashboard",
            items: [
                { title: "Recent Responses", url: "/dashboard" }, // The "Live" view
            ],
        },
        {
            title: "Survey Management",
            url: "/survey-runs",
            icon: ClipboardList,
            isActive: url.startsWith("/survey-runs"),
            items: [
                { title: "All Surveys", url: "/survey-runs" },
                { title: "Create New", url: "/survey-runs/create" },
            ],
        },
        {
            title: "Data Exports",
            url: "/exports",
            icon: FileDown,
            isActive: url.startsWith("/exports"),
            items: [
                { title: "Download Center", url: "/exports" },
            ],
        },
    ]

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain} />
                {/* <NavProjects projects={data.projects} /> */}
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}