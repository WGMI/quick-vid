import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const item = await req.json()
        await prismadb.video.update({
            where: {
                id: item.id,
            },
            data: {
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnail,
                url: item.url
            }
        })
        return new NextResponse("Successfully edited", { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Error:" + error, { status: 500 })
    }
}

