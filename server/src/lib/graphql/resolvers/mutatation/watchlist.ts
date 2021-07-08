import { Watchlist } from "@prisma/client";
import { prisma } from "../../../../db/prisma/client";
import { MyContext } from "../../context/context.type";

export const addWatchlist = async (_: null, { symbol }: { symbol: string }, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'

    try {
        const watchlist: Watchlist = await prisma.watchlist.create({
            data: {
                symbol,
                user_id
            }
        })
        return watchlist
    } catch(err) {
        return { id: '', symbol: '', user_id }
    }

}

export const removeWatchlist = async (_: null, { symbol }: { symbol: string }, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'

    try {
        const watchlist: Watchlist = await prisma.watchlist.delete({
            where: {
                user_id_symbol: {
                    user_id,
                    symbol
                }
            }
        })
        
        return watchlist
    } catch(err) {
        return { id: '', symbol: '', user_id }
    }

}