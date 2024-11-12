import prismadb from '@/lib/prismadb';
import { currentUser } from '@clerk/nextjs/server';
import IntaSend from 'intasend-node';
import { NextResponse } from 'next/server';

let intasend = new IntaSend(
    process.env.INSTASEND_PUBLISHABLE_KEY,
    process.env.INSTASEND_SECRET_KEY,
    false,
);

let payouts = intasend.payouts();
var req_approval = "NO" // Set to 'NO' if you want the transaction 

export async function POST(req) {
    try {
        if(1==1){
            return new NextResponse(JSON.stringify({ message: 'Success', data: req }), { status: 200 });
        }
        const user = await currentUser();
        const { credits, phoneNumber } = await req.json();

        const amount = parseInt(credits) * 1
        
        let collection = intasend.collection();
        const resp = await collection.mpesaStkPush({
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            host: 'https://nubian.tech',
            amount: amount,
            phone_number: '254' + phoneNumber,
            api_ref: `Pay QuickVid ${credits} Ksh`,
        });

        //Save to DB
        const transaction = await prismadb.transaction.create({
            data: {
                userId: user.id,
                invoice_id: resp.invoice.invoice_id,
                status: resp.invoice.state,
                credit_count: parseInt(credits),
                amount: resp.invoice.value,
                mpesa_ref: resp.invoice.mpesa_reference,
                createdAt: resp.invoice.created_at,
                updatedAt: resp.invoice.updated_at
            }
        })

        return new NextResponse(JSON.stringify({ message: 'Success', data: resp }), { status: 200 });
    } catch (err) {
        console.error('STK Push Resp error:', err);
        return new NextResponse('Failed: ' + err.message, { status: 505 });
    }
}