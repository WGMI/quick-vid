"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@clerk/nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"


const Landing = () => {

    const { isLoaded, userId } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && userId) {
            router.push('/dashboard'); // Redirect to the desired route
        }
    }, [isLoaded, userId, router]);

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col min-h-[100dvh] bg-[#0d1117] text-white">
          <header className="px-4 py-3 flex items-center justify-between">
            <Link href="#" className="flex items-center gap-2" prefetch={false}>
              <VideoIcon className="h-6 w-6 text-[#ffd700]" />
              <span className="text-lg font-bold">QuickVid</span>
            </Link>
            <Button variant="link" onClick={() => router.push('/dashboard')} className="text-[#ffd700]">
              Get Started
            </Button>
          </header>
          <main className="flex-1">
            <section className="px-4 py-12 md:py-20 flex flex-col items-center gap-6 bg-gradient-to-b from-[#0d1117] to-[#161b22]">
              <h1 className="text-4xl md:text-6xl font-bold text-[#ffd700] text-center">
                Create Stunning Videos in Seconds
              </h1>
              <p className="text-lg md:text-xl text-center max-w-md">
                Our AI-powered video creator makes it easy to produce professional-looking videos for your business.
              </p>
              <Button variant="solid" onClick={() => router.push('/dashboard')} className="bg-[#ffd700] text-[#0d1117] font-bold px-6 py-3 rounded-full">
                Get Started
              </Button>
            </section>
            <section className="px-4 py-12 md:py-20 flex flex-col items-center gap-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center gap-4">
                  <MagnetIcon className="h-12 w-12 text-[#ffd700]" />
                  <h3 className="text-xl font-bold">Effortless Video Creation</h3>
                  <p className="text-center text-[#ffd700]">
                    Our AI-powered tools make it easy to create professional-looking videos in no time.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <SettingsIcon className="h-12 w-12 text-[#ffd700]" />
                  <h3 className="text-xl font-bold">Customizable Templates</h3>
                  <p className="text-center text-[#ffd700]">
                    Choose from a wide range of customizable templates to fit your brand and style.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                  <RocketIcon className="h-12 w-12 text-[#ffd700]" />
                  <h3 className="text-xl font-bold">Instant Publishing</h3>
                  <p className="text-center text-[#ffd700]">
                    Publish your videos directly to your social media channels with just a few clicks.
                  </p>
                </div>
              </div>
            </section>
            <section className="px-4 py-12 md:py-20 bg-gradient-to-b from-[#161b22] to-[#0d1117]">
              <div className="max-w-md mx-auto flex flex-col items-center gap-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#ffd700] text-center">What Our Customers Say</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="bg-[#0d1117] rounded-lg p-6 shadow-lg">
                    <p className="text-[#ffd700] italic">
                      QuickVid has completely transformed my video marketing strategy. It's so easy to use and the
                      results are amazing!
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Avatar>
                        {/* <AvatarImage src="/placeholder-user.jpg" /> */}
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">John Doe</h4>
                        <p className="text-sm text-[#ffd700]">Marketing Manager</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#0d1117] rounded-lg p-6 shadow-lg">
                    <p className="text-[#ffd700] italic">
                      I never thought I could create such high-quality videos for my business, but QuickVid made it a
                      breeze. Highly recommended!
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold">Sarah Miller</h4>
                        <p className="text-sm text-[#ffd700]">Small Business Owner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="px-4 py-12 md:py-20 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#ffd700] text-center">Get Started Today</h2>
              <p className="text-lg md:text-xl text-center max-w-md">
                Sign up for our AI-powered video creator and start creating stunning videos for your business.
              </p>
              <form className="flex flex-col md:flex-row items-center gap-4 w-full max-w-md">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full md:flex-1 bg-[#0d1117] border-[#ffd700] focus:ring-[#ffd700]"
                />
                <Button variant="solid" className="bg-[#ffd700] text-[#0d1117] font-bold px-6 py-3 rounded-full">
                  Get Started
                </Button>
              </form>
            </section>
            <section className="px-4 py-12 md:py-20 flex flex-col items-center gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#ffd700] text-center">Example Video</h2>
              <div className="w-full max-w-2xl rounded-lg overflow-hidden">
                <video
                  className="w-full aspect-video"
                  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  controls
                />
              </div>
            </section>
          </main>
          <footer className="px-4 py-6 flex items-center justify-between bg-[#161b22]">
            <div className="flex items-center gap-2">
              <VideoIcon className="h-6 w-6 text-[#ffd700]" />
              <span className="text-lg font-bold">QuickVid</span>
            </div>
            <p className="text-sm text-[#ffd700]">&copy; 2024 QuickVid. All rights reserved.</p>
          </footer>
        </div>
      )
}


function MagnetIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15" />
        <path d="m5 8 4 4" />
        <path d="m12 15 4 4" />
      </svg>
    )
  }
  
  
  function RocketIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </svg>
    )
  }
  
  
  function SettingsIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }
  
  
  function VideoIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
        <rect x="2" y="6" width="14" height="12" rx="2" />
      </svg>
    )
  }


export default Landing