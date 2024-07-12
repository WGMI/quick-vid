import Videos from "@/components/videos"
import prismadb from "@/lib/prismadb"
import { currentUser } from "@clerk/nextjs/server"

export default async function Dashboard({ params }) {
    const user = await currentUser()
    const data = await prismadb.Video.findMany({
        where: {
            userId: user.id,
            title:{
                contains: params.query
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <Videos data={data} />
    )
}
