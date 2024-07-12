import { VIDEO_CREDITS } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const data = await req.json()

    const user = await currentUser()

    try {
        //Check if user has enough credits
        const userCredits = await prismadb.userCredits.findFirst({
            where: {
                userId: user.id
            }
        })

        if (userCredits.count < VIDEO_CREDITS) return new NextResponse(JSON.stringify({ message: 'Low Credits. Please top up your account.' }), { status: 200 })

        //Deduct from users credits
        await prismadb.userCredits.update({
            where: {
                userId: user.id
            },
            data: {
                count: {
                    decrement: VIDEO_CREDITS
                }
            }
        })


        //Generate video  

        // if (1 == 1) return new NextResponse(JSON.stringify({ message: 'Success', url: data }), { status: 200 })
        try {
            const response = await axios.post(process.env.QUICKVID_GENERATOR_URL, {
                projectname: data.data.projectname,
                script: data.data.script,
                images: data.data.images
            })
            return new NextResponse(JSON.stringify({ message: 'Success', url: response.data.url }), { status: 200 })
        } catch (error) {
            return new NextResponse('Failed: ' + error.message, { status: 500 })
        }
    } catch (err) {
        return new NextResponse('Failed: ' + err.message, { status: 500 })
    }
}