
import { PROMPT_CREDITS } from '@/lib/constants'
import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req) {
    const { script } = await req.json()
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

        if (userCredits.count < PROMPT_CREDITS) return new NextResponse(JSON.stringify({ message: 'Low Credits. Please top up your account.' }), { status: 200 })

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
            { "role": "system", "content": "Your job is to find themes in essays." },
            { "role": "user", "content": `Please generate 5 themes in the following text. Return the data in square brackets and separate with commas. Make sure to add double quotes around each theme. An example: ["theme1","theme2","theme3","theme4","theme5"]. The text: ${script}` }
        ]

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages,
            })
            const themes = response.choices[0].message.content
            return new NextResponse(JSON.stringify({ message: 'Success', themes }), { status: 200 })
        } catch (err) {
            return new NextResponse('Failed: ' + err.message, { status: 500 })
        }
    } catch (err) {
        return new NextResponse('Failed: ' + err.message, { status: 500 })
    }
}