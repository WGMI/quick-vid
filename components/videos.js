"use client"

import { Eye, Grid, List, MoreHorizontal, PenIcon, Share2, Trash2, X } from "lucide-react"
import Image from "next/image"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import Link from "next/link"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "./ui/input"

const Videos = ({ data }) => {
    const router = useRouter()
    const [view, setView] = useState("list")
    const [showVideoDialog, setShowVideoDialog] = useState(false)
    const [videoUrl, setVideoUrl] = useState("")
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")
    const [editingTarget, setEditingTarget] = useState(null)

    const truncate = (str, n) => str?.length > n ? str.substr(0, n - 1) + "..." : str

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
            .catch((error) => {
                console.error('Error copying text:', error)
            })
    }

    const shareVideo = (item) => {
        handleCopy(item.url)
        alert("Link Copied")
    }

    const showVideo = (item) => {
        setVideoUrl(item.url)
        setShowVideoDialog(true)
    }

    const editVideo = async () => {
        let item = data.find(item => item.id === editingTarget)
        if(!newTitle && !newDescription){
            setEditingTarget(null)
            return
        }
        if (newTitle !== "") item.title = newTitle
        if (newDescription !== "") item.description = newDescription
        try {
            const values = item
            await axios.post("/api/project/update", values).then((res) => {
                if (res.status == 200) {
                    setEditingTarget(null)
                    setNewTitle("")
                    setNewDescription("")
                    router.refresh()
                }
            })
        }
        catch (e) {
            alert("Something went wrong. Please try again.\n" + e.message)
            console.log("Error saving video:", e)
        }
    }

    const deleteVideo = async (id) => {
        try {
            const values = { id }
            await axios.post("/api/project/delete", values).then((res) => {
                if (res.status == 200) {
                    router.refresh()
                }
            })
        }
        catch (e) {
            alert("Something went wrong. Please try again.\n" + e.message)
            console.log("Error deleting video: ", e)
        }
    }

    const DisplayPicker = () => (
        <div className="flex gap-4">
            <Button onClick={() => setView("list")} className={cn("text-gray-500 hover:text-gray-700 bg-transparent", view === "list" ? "text-primary" : "")}><List className="h-5 w-5" /></Button>
            <Button onClick={() => setView("grid")} className={cn("text-gray-500 hover:text-gray-700 bg-transparent", view === "grid" ? "text-primary" : "")}><Grid className="h-5 w-5" /></Button>
        </div>
    )

    const Controls = ({ item, direction }) => (
        <div className={cn("flex justify-center items-center space-y-2", direction === "row" ? "flex-row" : "flex-col")}>
            <Button onClick={() => showVideo(item)} className="text-gray-500 hover:text-gray-700 bg-transparent">
                <Eye className="w-5 h-5" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="text-gray-500 hover:text-gray-700 bg-transparent">
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => shareVideo(item)}><Share2 className="w-4 h-4" />&nbsp;Share</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setEditingTarget(item.id)}><PenIcon className="w-4 h-4" />&nbsp;Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => confirm("Are you sure?") && deleteVideo(item.id)}><span className="flex flex-row text-red-500"><Trash2 className="w-4 h-4" />&nbsp;Delete</span></DropdownMenuItem>
                    <DropdownMenuSeparator />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )

    const LargeVideoPlayer = ({ url }) => (
        <Dialog open={showVideoDialog} onClose={() => setShowVideoDialog(false)}>
            <DialogContent className="sm:max-w-[90vw] sm:max-h-[90vh] overflow-hidden rounded-lg">
                <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-1 sm:p-6">
                    <div className="rounded-md overflow-hidden aspect-video">
                        <video className="p-20 w-full h-full" controls>
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    </div>
                </div>
                <div>
                    <Button variant="ghost" className="absolute top-4 right-4" onClick={() => setShowVideoDialog(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )

    if (data.length === 0) {
        return (
            <div className="pt-10 flex flex-col items-center justify-center space-y-3">
                <div className="relative w-60 h-60">
                    <Image className="grayscale rounded-lg" src="/empty.jpg" fill alt="empty" />
                </div>
                <p>No Vidoes Found</p>
                <Link href={"/new-project"} className="inline-block bg-primary hover:bg-gray-700 text-white dark:text-black py-2 px-4 rounded">Start A Project</Link>
            </div>
        )
    }

    if (view === "grid") {
        return (
            <div className="container mx-auto p-4">
                <LargeVideoPlayer />
                <DisplayPicker />
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-10">
                    {data.map((item) => (
                        <Card key={item.id} className="w-[250px]">
                            <CardHeader>
                                <div className="relative w-full h-0 pb-[100%]">
                                    <video
                                        src={item.url}
                                        controls
                                    />
                                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                        {item.duration}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div>{item.title}</div>
                                <div className="text-muted-foreground text-xs">{item.createdAt.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                <Controls item={item} direction="row" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4">
            <LargeVideoPlayer />
            <DisplayPicker />
            <div>
                {data.map((item) => (
                    <div key={item.id} className="flex items-center p-4 border-b border-gray-200 w-full pointer:cursor hover:border-gray-500">
                        <div className="w-48 h-48 rounded-lg">
                            <video
                                className="w-full h-full"
                                src={item.url}
                                controls
                            />
                        </div>

                        {item.id !== editingTarget ?
                            <div className="flex-grow pr-10 pl-10">
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-gray-600">{truncate(item.description, 100)}</p>
                            </div>
                            :
                            <div className="flex-grow pr-10 pl-10">
                                <Input placeholder={item.title} value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                                <Input placeholder={item.description} value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="my-5" />
                                <Button className="mr-5" onClick={editVideo}>Update</Button>
                                <Button onClick={() => setEditingTarget(null)}>Cancel</Button>
                            </div>
                        }
                        <div className="flex flex-col justify-center items-center space-y-2 pr-10">
                            <span className="text-gray-500">{item.createdAt.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</span>
                            <span className="text-gray-500 text-xs">{item.duration}</span>
                        </div>
                        <Controls item={item} direction="col" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Videos