import { prisma } from '../../../../db/prisma/client'
import { MyContext } from '../../context/context.type'

export const getCash = async (_: null, __: null, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'
    
    const cash = await prisma.cashTransaction.aggregate({
        _sum: {
            amount: true
        },
        where: {
            user_id
        }
    })

    if (!cash) throw 'Unable to process cash out. Try again later'

    return { cash: cash._sum.amount }
}