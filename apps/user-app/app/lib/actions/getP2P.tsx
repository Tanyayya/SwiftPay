import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../auth";
export async function getP2Ptransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
           
        }
    });
    return txns.map(t => ({
        time: t.timeStamp,
        amount: t.amount,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId
    }))
}