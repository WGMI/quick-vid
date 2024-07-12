
import { IMAGE_CREDITS } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req) {
    const { themes } = await req.json()
    const user = await currentUser()
    const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY
    const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true })

    try {
        //Check if user has enough credits
        const userCredits = await prismadb.userCredits.findFirst({
            where: {
                userId: user.id
            }
        })

        if (userCredits.count < IMAGE_CREDITS) return new NextResponse(JSON.stringify({ message: 'Low Credits. Please top up your account.' }), { status: 200 })

        //Deduct from users credits
        await prismadb.userCredits.update({
            where: {
                userId: user.id
            },
            data: {
                count: {
                    decrement: IMAGE_CREDITS
                }
            }
        })

        //Send prompt to OpenAI
        try {
            let imagelist = []
            for (const element of themes) {
                const response = await openai.images.generate({
                    model: "dall-e-3",
                    prompt: element,
                    size: "1024x1792",
                    quality: "standard",
                    n: 1,
                })
                imagelist.push(response.data[0].url)
            }

            return new NextResponse(JSON.stringify({ message: 'Success', imagelist }), { status: 200 })
        } catch (err) {
            return new NextResponse('Failed: ' + err.message, { status: 500 })
        }
    } catch (err) {
        return new NextResponse('Failed: ' + err.message, { status: 500 })
    }
}