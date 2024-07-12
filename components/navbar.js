"use client"

import { PanelLeft, Search } from "lucide-react"
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import MobileSidebar from "./mobile-sidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const font = Poppins({
  weight: "600",
  subsets: ["latin"]
})
const Navbar = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }

    replace(`${pathname}?${params.toString()}`)
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div><Link href={"/"} className={font.className}>QuickVid</Link></div>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <MobileSidebar />
        </SheetContent>
      </Sheet>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          defaultValue={searchParams.get("query") || ""}
          type="search"
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        /> */}
      </div>
      <ModeToggle />
      <UserButton />
    </header>
  );
}

export default Navbar;