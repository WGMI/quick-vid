"use client"

import React from 'react';
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { routes, bottomRoutes } from '@/lib/routes';

const Sidebar = () => {
    const pathname = usePathname()
    const router = useRouter()

    const onNavigate = (url) => {
        return router.push(url)
    }

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            {routes.map((route) => (
                <TooltipProvider key={route.name}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={route.path} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                                <route.icon className="h-5 w-5" />
                                <span className="sr-only">{route.name}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{route.name}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            {bottomRoutes.map((route) => (
                <TooltipProvider key={route.name}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={route.path} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                                <route.icon className="h-5 w-5" />
                                <span className="sr-only">{route.name}</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">{route.name}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </nav>
      </aside>
    );
};

export default Sidebar;
