import { prisma } from "../../../../db/prisma/client";
import { MyContext } from "../../context/context.type";

export const getWatchlist = async (_: null, __: null, { user_id }: MyContext) => {
    if (!user_id) throw 'Log in required'
    
    const watchlist = await prisma.watchlist.findMany({
        where: {
            user_id
        }
    })

    return watchlist;
}