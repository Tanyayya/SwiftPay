
import { Card } from "@repo/ui/card"

export const OnP2Ptransaction  = ({
    transactions,userId
}: {
    transactions: {
        time: Date,
        amount: number,
        // TODO: Can the type of `status` be more specific?
       fromUserId:number,
       toUserId:number,
    }[],
    userId:number
}) => {
    
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent P2P Transactions">
        <div className="pt-2 ">
        {transactions.map(t => <div className="flex justify-between">
                <div>
                    {t.fromUserId==userId?<div className="text-sm">
                        Sent INR
                    </div>:<div className="text-sm">
                        Received INR
                    </div>}
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                {t.fromUserId==userId?<div className="flex flex-col justify-center">
                    - Rs {t.amount / 100}
                </div>:<div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>}

            </div>)}
        </div>
    </Card>
}