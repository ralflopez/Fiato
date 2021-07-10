import { prisma } from "../../../../db/prisma/client"
import { MyContext } from "../../context/context.type"

export const getTradeTransactions = async (_: null, __: null, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'

    const transactions = await prisma.trade.findMany({
        where: {
            user_id,
        },
    })

    return transactions
}