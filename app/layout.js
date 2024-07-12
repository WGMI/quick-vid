import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Sidebar from "@/components/sidebar"
import Navbar from "@/components/navbar"
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuickVid",
  description: "AI Generated Videos",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <SignedIn>
              <div className="flex min-h-screen w-full flex-col bg-muted/40">
                <Sidebar />
                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                  <Navbar />
                  <main className="md:pl-20 md:pr-20 pt-16 h-full">
                    {children}
                  </main>
                  <Toaster />
                </div>
              </div>
            </SignedIn>
            <SignedOut>
              <main>
                {children}
              </main>
            </SignedOut>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
