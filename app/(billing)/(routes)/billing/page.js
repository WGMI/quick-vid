import prismadb from '@/lib/prismadb'
import { currentUser } from '@clerk/nextjs/server'
import Billing from '../components/billing'

export default async function Settings() {
    const user = await currentUser()
    const transactions = await prismadb.transaction.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const usercredits = await prismadb.userCredits.findFirst({
        where: {
            userId: user.id,
        }
    })

    return (
        <><Billing transactions={transactions} usercredits={usercredits}/></>
    )
}