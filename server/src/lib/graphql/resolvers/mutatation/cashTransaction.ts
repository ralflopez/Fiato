import { CashTransaction } from "@prisma/client";
import { prisma } from "../../../../db/prisma/client";
import { MyContext } from "../../context/context.type";

export const cashIn = async (_: null, { amount }: { amount: number }, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'

    if (amount <= 0) throw 'Amount should be greater than 0'

    const transaction: CashTransaction = await prisma.cashTransaction.create({
        data: {
            amount, user_id
        }
    })

    if (!transaction) throw 'Unable to add cash. Try again later'
    
    return transaction
}

export const cashOut = async (_: null, { amount }: { amount: number }, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'

    const deductedAmount = amount > 0 ? -(amount) : amount

    const transaction: CashTransaction = await prisma.cashTransaction.create({
        data: {
            amount: deductedAmount, user_id
        }
    })

    if (!transaction) throw 'Unable to add cash. Try again later'
    
    return transaction
}