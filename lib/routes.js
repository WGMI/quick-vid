import { CreditCard, Folder, Home, HomeIcon, LineChart, Package2, Plus, Settings } from 'lucide-react';

export const routes = [
    {
        icon: Home,
        name: "Projects",
        path: "/dashboard"
    },
    {
        icon: Plus,
        name: "Create",
        path: "/new-project"
    }
]

export const bottomRoutes = [
    {
        icon: Settings,
        name: "Settings",
        path: "/settings"
    },
    {
        icon: CreditCard,
        name: "Billing",
        path: "/billing"
    }
]