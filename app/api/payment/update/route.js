import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PUT(req){
    try {
        const { invoiceNo, status } = await req.json()
        const transaction = await prismadb.transaction.findFirst({
            where: {
                invoice_id: invoiceNo
            }
        })
        await prismadb.transaction.update({
            where: {
                id: transaction.id
            },
            data: {
                status
            }
        })

        if(status !== 'COMPLETE') return new NextResponse(JSON.stringify({ message: 'Success', status: status }), { status: 200 });
        
        //Create user credits if not present
        let userCredits = await prismadb.userCredits.findFirst({
            where: {
                userId: transaction.userId
            }
        })

        if(!userCredits){
            userCredits = await prismadb.userCredits.create({
                data: {
                    userId: transaction.userId,
                    count: 0
                }
            })
        }
        
        //Update user credits
        await prismadb.userCredits.update({
            where: {
                userId: transaction.userId
            },
            data: {
                count: {
                    increment: transaction.credit_count
                }
            }
        })

        return new NextResponse(JSON.stringify({ message: 'Success', status: status }), { status: 200 });
    } catch (error) {
        return new NextResponse("Internal Error:" + error, { status: 500 })
    }
}
    