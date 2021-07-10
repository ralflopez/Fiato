import { prisma } from "../../../../db/prisma/client";
import { MyContext } from "../../context/context.type";

export const getPortfolio = async (_: null, __: null, { user_id }: MyContext) => {
    const portfolio = await prisma.trade.groupBy({
        by: ['shares', 'symbol',],
        _sum: {
            shares: true,
            price: true,
        },
        where: {
            user_id,
        },
        having: {
            shares: {
                gt: 0,
            }
        }
    })

    const parsed = portfolio.map((details: any) => ({
        symbol: details.symbol,
        shares: details._sum.shares,
        price: details._sum.price
    }))
    console.log(parsed)

    return parsed
}