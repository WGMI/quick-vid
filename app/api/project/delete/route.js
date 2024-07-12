import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const { id } = await req.json()
        await prismadb.video.delete({
            where: {
                id: id,
            },
        })
        return new NextResponse("Successfully deleted", { status: 200 })
    } catch (error) {
        return new NextResponse("Internal Error:" + error, { status: 500 })
    }
}

