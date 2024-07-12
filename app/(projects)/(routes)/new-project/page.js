"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CircleX, Copy } from 'lucide-react'
import { useState } from 'react'
import axios from 'axios'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader } from '@/components/ui/dialog'
import Link from 'next/link'

const NewProject = () => {
    const [projectName, setProjectName] = useState("New Project-" + Math.floor(Math.random() * 1000000))
    const [description, setDescription] = useState("")
    const [prompt, setPrompt] = useState('')
    const [showPromptForm, setShowPromptForm] = useState(true)
    const [loading, setLoading] = useState(false)
    const [videoloading, setVideoLoading] = useState(false)
    const [script, setScript] = useState("")
    const [isValid, setIsValid] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState("")
    const [copied, setCopied] = useState(false)

    const wordcount = () => (script.length == 0) ? 0 : script.trim().split(/\s+/).length

    const handleCopy = () => {
        const text = generatedVideoUrl
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
            })
            .catch((error) => {
                console.error('Error copying text:', error)
            })
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        if (prompt === '') {
            alert('Please enter a prompt')
            setLoading(false)
            return
        }

        // Send prompt to OpenAI
        try {
            await axios.post("/api/prompt", { prompt }).then((res) => {
                if (res.status == 200) {
                    if (res.data.message == 'Low Credits. Please top up your account.') {
                        alert(res.data.message)
                        setLoading(false)
                        return
                    }
                    setScript(res.data.script)
                }
                setIsValid(true)
                setLoading(false)
            })
        }
        catch (e) {
            setLoading(false)
            console.log("Error prompting:", e)
        }
    }

    const handleScriptChange = (e) => {
        let scriptText = e.target.value
        setScript(scriptText)
        setIsValid(scriptText.length >= 50)
    }

    const generateThemes = async () => {
        setVideoLoading(true)

        try {
            await axios.post("/api/prompt/themes", { script }).then((res) => {
                if (res.status == 200) {
                    if (res.data.message == 'Low Credits. Please top up your account.') {
                        alert(res.data.message)
                        setVideoLoading(false)
                        return
                    }
                    generateImages(JSON.parse(res.data.themes))
                }
            })
        }
        catch (e) {
            setVideoLoading(false)
            console.log("Error generating themes:", e)
            alert("Error generating themes: " + e)
        }
    }

    const generateImages = async (themes) => {
        if (themes.length < 1) return

        try{
            await axios.post("/api/prompt/images", { themes }).then((res) => {
                if (res.status == 200) {
                    if (res.data.message == 'Low Credits. Please top up your account.') {
                        alert(res.data.message)
                        setVideoLoading(false)
                        return
                    }
                    sendToQuickVid(res.data.imagelist)
                }
            })
        }
        catch(e){
            setVideoLoading(false)
            console.log("Error generating images:", e)
            alert("Error generating images: " + e)
        }
    }

    const sendToQuickVid = async (imagelist) => {
        let data = {
            projectname: projectName,
            script,
            images: imagelist
        }

        try {
            await axios.post("/api/prompt/video", { data }).then((res) => {
                if (res.status == 200) {
                    if (res.data.message == 'Low Credits. Please top up your account.') {
                        alert(res.data.message)
                        setVideoLoading(false)
                        return
                    }
                    setGeneratedVideoUrl(res.data.url)
                    saveVideo(res.data.url)
                }
            })
        } catch (e) {
            setVideoLoading(false)
            console.log("Error generating video:", e)
            alert("Error generating video: " + e)
        }
    }

    const saveVideo = async (url) => {
        try {
            const values = {
                title: projectName,
                description: description || script.substring(0, 100) + '...',
                thumbnail: "NA",
                url: url,
                createdAt: new Date().toISOString()
            }
            await axios.post("/api/project", values).then((res) => {
                if (res.status == 200) {
                    setShowDialog(true)
                    setVideoLoading(false)
                }
            })
        }
        catch (e) {
            console.log("Error saving video:", e)
        }
    }

    return (
        <div>
            <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
                <DialogContent>
                    <DialogHeader>Success</DialogHeader>
                    <DialogDescription>
                        Your video has been created and saved.
                        <br />
                        <Link className="underline" href="/dashboard">Return Home</Link>
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={handleCopy}>
                            <Copy />&nbsp;
                            {copied ? 'Copied!' : 'Copy Link'}
                        </Button>
                        <Button onClick={() => setShowDialog(false)}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <Input
                onChange={(e) => setProjectName(e.target.value)}
                value={projectName}
                className="text-xl outline-none bg-transparent border-none"
                placeholder="New Project"
            />
            <Input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="text-sm bg-transparent my-5"
                placeholder="Add a description for your video (optional)"
            />
            <h3>Enter a prompt to generate a script or paste your script below</h3>
            {!showPromptForm &&
                <Button className="my-5 py-2 rounded-md" onClick={() => setShowPromptForm(true)}>Generate a Script</Button>
            }
            {showPromptForm &&
                <div className='py-2 px-5 border border-gray-200 rounded-lg'>
                    <div className='flex justify-end'>
                        <Button className="text-black dark:text-white hover:text-gray-700 bg-transparent" onClick={() => setShowPromptForm(false)}>
                            <CircleX className='h-5 w-5' />
                        </Button>
                    </div>
                    <form onSubmit={handleSubmit} className="my-10 mx-auto shadow-md rounded-md">
                        <div className="mb-4">
                            <label className="block text-sm font-bold mb-2">Prompt:</label>
                            <input
                                type="text"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <Button type="submit" className="w-full py-2 rounded-md" disabled={loading}>{loading ? 'Loading...' : 'Generate Script'}</Button>
                    </form>
                </div>
            }
            <Textarea className="my-5 h-32" placeholder="Your script..." value={script} onChange={handleScriptChange} />
            <p>Word count: {wordcount(script)}</p>
            {(!isValid && script.length > 0) && <p className='text-red-500'>Textarea must be at least 50 characters long</p>}
            <div className='flex justify-center w-full'>
                {isValid && <Button className="my-5 py-2 rounded-md" onClick={generateThemes} disabled={videoloading}>{videoloading ? 'Generating...' : 'Generate Video'}</Button>}
            </div>
        </div>
    )
}

export default NewProject