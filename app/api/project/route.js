import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        const user = await currentUser()

        const { title, description, thumbnail, url, createdAt } = body

        if (!user || !user.id || !user.firstName) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!title || !url || !createdAt) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        //Check credits

        const video = await prismadb.video.create({
            data: {
                userId: user.id,
                title,
                description,
                thumbnail,
                url,
                createdAt
            }
        })

        return new NextResponse("Success",{ status: 200 })
    } catch (error) {
        return new NextResponse("Internal Error:" + error, { status: 500 })
    }
}

