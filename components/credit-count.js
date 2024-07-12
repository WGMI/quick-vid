import prismadb from "@/lib/prismadb";
import { currentUser } from "@clerk/nextjs/server";

const CreditCount = async () => {
    const user = await currentUser()
    const userCredits = await prismadb.userCredits.findFirst({
        where: {
            userId: user.id
        }
    })
    return (
        <p className="font-medium border border-yellow-400 rounded-md p-1 my-1">{userCredits.count} credits</p>
    );
}
 
export default CreditCount;