"use client"

import * as React from "react"
import {
    AudioWaveform,
    BookOpen,
    Command,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    ChartPie,
    ChartNoAxesCombined,
    FileDown,
    MapPlus,
    ClipboardList
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

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "APVMA",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "HREC",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "ACQSC",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: ChartPie,
            isActive: true,
            items: [
                {
                    title: "My Active Surveys",
                    url: "http://localhost:8000/dashboard",
                },
                {
                    title: " Recent Responses",
                    url: "#",
                },
            ],
        },
        {
            title: "Templates",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "All Templates",
                    url: "#",
                },
                {
                    title: "Create Template",
                    url: "#",
                },
            ],
        },
        {
            title: "Survey Runs",
            url: "#",
            icon: ClipboardList,
            items: [
                {
                    title: "Active Surveys",
                    url: "#",
                },
                {
                    title: "Create Survey Run",
                    url: "/survey-runs/create",
                },
                {
                    title: "My Archived Surveys",
                    url: "#",
                },
            ],
        },
        {
            title: "Reports",
            url: "#",
            icon: ChartNoAxesCombined,
            items: [
                {
                    title: "Survey Analytics",
                    url: "#",
                },
            ],
        },
        {
            title: "Exports",
            url: "#",
            icon: FileDown,
            items: [
                {
                    title: "Export Responses",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
