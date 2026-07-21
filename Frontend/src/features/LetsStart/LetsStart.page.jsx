import './LetsStart.style.css'
import { Link } from 'react-router'
import { UserButton } from '@clerk/react'
import react from 'react'
import { LuPlus } from "react-icons/lu";
import {
    ChevronRight,
    ChevronsUpDown,
    GalleryVerticalEnd,
    SquareTerminal,
    Bot,
    BookOpen,
    Settings2,
} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
    SidebarProvider,
    SidebarTrigger,
    SidebarHeader,
    SidebarFooter,
    useSidebar,
} from "@/components/ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
    ],
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "/SubscriptionPlans",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
}

const SidebarFooterAuth = () => {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="w-full justify-center">
                    <UserButton showName={!isCollapsed} appearance={{
                        elements: {
                            rootBox: "w-full",
                            userButtonTrigger: "w-full flex justify-center",
                            userButtonBox: "flex-row-reverse justify-between w-full",
                            userButtonOuterIdentifier: "truncate font-semibold text-xl",
                        }
                    }} />
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

const LetsStartpage = () => {
    const activeTeam = data.teams[0];
    const ActiveTeamLogo = activeTeam.logo;

    return (
        <SidebarProvider>
            {/* The default shadcn sidebar is variant="sidebar" which styles it nicely based on CSS vars */}
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                            <ActiveTeamLogo className="size-4" />
                                        </div>
                                        <div className="grid flex-1 text-left leading-tight">
                                            <span className="truncate font-semibold text-lg">
                                                {activeTeam.name}
                                            </span>
                                            <span className="truncate text-sm">
                                                {activeTeam.plan}
                                            </span>
                                        </div>
                                        <ChevronsUpDown className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    align="start"
                                    side="bottom"
                                    sideOffset={4}
                                >
                                    <DropdownMenuItem>
                                        <span>{activeTeam.name}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className="text-sm uppercase tracking-wider mt-2 mb-1">Platform</SidebarGroupLabel>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <Collapsible
                                    key={item.title}
                                    asChild
                                    defaultOpen={item.isActive}
                                    className="group/collapsible"
                                >
                                    <SidebarMenuItem>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuButton tooltip={item.title} className="text-base h-10">
                                                {item.icon && <item.icon className="!w-5 !h-5" />}
                                                <span>{item.title}</span>
                                                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                            </SidebarMenuButton>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => (
                                                    <SidebarMenuSubItem key={subItem.title}>
                                                        <SidebarMenuSubButton asChild className="text-sm h-8">
                                                            <a href={subItem.url}>
                                                                <span className="text-base">{subItem.title}</span>
                                                            </a>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </SidebarMenuItem>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter>
                    <SidebarFooterAuth />
                </SidebarFooter>
            </Sidebar>

            <div className="flex-1 flex flex-col h-screen w-full relative">
                {/* Header with trigger */}
                <header className="absolute top-0 left-0 p-4 z-10">
                    <SidebarTrigger className="text-white hover:text-gray-300" />
                </header>

                {/*main page*/}
                <div
                    className={'lets-start-page w-full h-full bg-(--page-bg) text-white font-sans font-extralight flex flex-col items-center justify-center'}>
                    <div
                        className={'container flex justify-center w-[40%] flex-col text-center mx-auto'}>
                        <h1 className={"text-5xl"}>Welcome to Ganitam Nirmoktra</h1>
                        <h6 className={'text-lg mt-2'}>How can I help you chandan?</h6>
                    </div>
                    <div className={'w-[50%] rounded-full mx-auto border border-gray-200 bottom-20 fixed'}>
                        <form className="flex flex-row items-center">
                            <button
                                className={'flex justify-start mx-2 items-center w-10 h-10 rounded-full focus:outline-none'}>
                                <LuPlus className={'w-8 h-7 mx-auto'} />
                            </button>
                            <input type={'text'} id={''} placeholder={'Ask any question you want to ask.'}
                                className={'w-full p-4 rounded-full outline-none text-white'} />
                        </form>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}

export default LetsStartpage

