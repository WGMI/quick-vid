import Link from "next/link";
import { routes, bottomRoutes } from '@/lib/routes';

const MobileSidebar = () => {
    return (
        <nav className="grid gap-6 text-lg font-medium">
            {routes.map((route) => (
                <Link
                    key={route.name}
                    href={route.path}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <route.icon className="h-5 w-5" />
                    {route.name}
                </Link>
            ))}
            {bottomRoutes.map((route) => (
                <Link
                    key={route.name}
                    href={route.path}
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                    <route.icon className="h-5 w-5" />
                    {route.name}
                </Link>
            ))}
            
        </nav>
    );
}

export default MobileSidebar;