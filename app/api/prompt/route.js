import { PROMPT_CREDITS } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req) {
    const { prompt } = await req.json()
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

        if(userCredits.count < PROMPT_CREDITS) return new NextResponse(JSON.stringify({ message: 'Low Credits. Please top up your account.' }), { status: 200 })

        //Deduct from users credits
        await prismadb.userCredits.update({
            where: {
                userId: user.id
            },
            data: {
                count: {
                    decrement: PROMPT_CREDITS
                }
            }
        })

        //Send prompt to OpenAI
        const messages = [
            { "role": "system", "content": "Your job is to create essays from a subject." },
            { "role": "user", "content": `Make a 130 word essay about ${prompt}` }
        ]

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages,
            })
            const script = response.choices[0].message.content
            return new NextResponse(JSON.stringify({ message: 'Success', script }), { status: 200 })
        } catch (err) {
            return new NextResponse('Failed: ' + err.message, { status: 500 })
        }
    } catch (err) {
        return new NextResponse('Failed: ' + err.message, { status: 500 })
    }
}