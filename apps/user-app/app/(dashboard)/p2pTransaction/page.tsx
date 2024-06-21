import { SendMoney } from "../../../components/SendMoney"
import { OnP2Ptransaction } from "../../../components/OnP2Ptransaction";
import { getServerSession } from "next-auth";
import prisma from "@repo/db/client";
import { authOptions } from "../../lib/auth";

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
export default async function() {
    const transactions = await getP2Ptransactions();
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);
    return (
        <div className="w-screen">
        <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 p-4">
            <div>
                <SendMoney />
            </div>
           
                
                <div className="pt-4">
                   <OnP2Ptransaction userId={userId} transactions={transactions}/>
                </div>
           
        </div>
    </div>
    )
}