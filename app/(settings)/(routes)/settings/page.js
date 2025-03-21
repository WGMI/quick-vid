"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import axios from "axios"
import { useState } from "react"

export default function Settings() {

  const [test, setTest] = useState(false)

  const testServer = async () => {
    await axios.post("/api/test").then((res) => {
      alert(res.data)
    }).catch((e) => {
      alert(e)
    })
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {/* <aside className="hidden w-64 flex-col border-r bg-background p-6 sm:flex">

            </aside> */}
      <div className="flex-1 p-6 sm:p-10">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <div className="grid gap-8">
            {/* <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label>Profile Picture</Label>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button variant="outline">Change</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card> */}
            <Card>
              <CardHeader>
                <CardTitle onClick={() => { setTest(!test) }}>Preferences</CardTitle>
                <CardDescription>Customize your video settings</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                {/* <div className="grid gap-2">
                  <Label htmlFor="quality">Video Quality</Label>
                  <Select id="quality">
                    <SelectTrigger>
                      <SelectValue placeholder="Select quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="720p">720p</SelectItem>
                      <SelectItem value="1080p">1080p</SelectItem>
                      <SelectItem value="1440p">1440p</SelectItem>
                      <SelectItem value="2160p">2160p (4K)</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                {/* <div className="grid gap-2">
                                    <Label htmlFor="aspect-ratio">Aspect Ratio</Label>
                                    <Select id="aspect-ratio">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select aspect ratio" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="16:9">16:9</SelectItem>
                                            <SelectItem value="4:3">4:3</SelectItem>
                                            <SelectItem value="1:1">1:1 (Square)</SelectItem>
                                            <SelectItem value="21:9">21:9 (Ultrawide)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div> */}
                <div className="grid gap-2">
                  <Label className="my-4" htmlFor="export-settings">Visibility Setting</Label>
                  <Select id="aspect-ratio">
                    <SelectTrigger>
                      <SelectValue placeholder="Choose whether the videos can be seen by others on this platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:9">Private</SelectItem>
                      <SelectItem value="4:3">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
            {test ?
              <Card>
                <CardHeader>
                  <CardTitle onClick={() => { setTest(!test) }}>Test Server</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="grid gap-2">
                    <Button onClick={() => testServer()}>Test Server</Button>
                  </div>
                </CardContent>
              </Card>
              :
              null
            }
          </div>
        </div>
      </div>
    </div>
  )
}