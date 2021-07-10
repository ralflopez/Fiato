import { prisma } from '../../../../db/prisma/client'
import { MyContext } from '../../context/context.type'
import { getBalance } from '../methods/trade'

export const getCash = async (_: null, __: null, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'
    
    const cash = await getBalance(user_id)

    if (!cash) throw 'Unable to process cash out. Try again later'

    return { cash }
}