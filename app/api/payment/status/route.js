import IntaSend from 'intasend-node';
import { NextResponse } from 'next/server';

let intasend = new IntaSend(
    process.env.INSTASEND_PUBLISHABLE_KEY,
    process.env.INSTASEND_SECRET_KEY,
    false,
);

export async function POST(req) {
    const { invoiceNo } = await req.json()
    try {
        let collection = intasend.collection();
        const resp = await collection.status(invoiceNo)
        return new NextResponse(JSON.stringify({ message: 'Success', data: resp }), { status: 200 })
    } catch (err) {
        return new NextResponse('Failed: ' + err.message, { status: 505 })
    }
}
