import { OnRampTransactions } from "../../../components/OnRampTransactions"
import { getOnRampTransactions } from "../transfer/page"

export  default async function() {
    const transactions = await getOnRampTransactions();
    return <div className="w-screen">
    <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
       
        <div>
           
            <div className="pt-4">
                <OnRampTransactions transactions={transactions} />
            </div>
        </div>
        <div>
        <div className="pt-4">
                
            </div>
        </div>
    </div>
</div>
}