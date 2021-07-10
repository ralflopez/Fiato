import { MyContext } from "../../context/context.type";
import { prisma } from "../../../../db/prisma/client";
import { Trade } from "@prisma/client";
import { getBalance, getPrice, getShares } from "../methods/trade";

export const buy = async (_:null, { symbol, shares }: { symbol: string, shares: number }, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required'
    
    // check if shares is a valid integer
    if (shares < 0 || shares % 1 > 0) throw 'Shares must be a positive integer'

    // get realtime price
    const price: number | null = await getPrice(symbol)
    if (!price) throw `Unable to get ${symbol} price. Try again later`

    // check if balance is sufficient
    const balance = await getBalance(user_id)
    if (!balance) throw 'Unable to get balance. Try again later'
    
    const totalPrice = shares * price
    if (totalPrice > balance) throw 'Insuffiecient funds of ' + totalPrice

    // add to database
    try {
        const buy: Trade = await prisma.trade.create({
            data: {
                price,
                shares,
                symbol,
                user_id
            }
        })
        return buy
    } catch(err) {
        throw err
    }
}

export const sell = async (_:null, { symbol, shares }: { symbol: string, shares: number }, { user_id }: MyContext) => {
    if (!user_id) throw 'Login required' 

    if (shares == 0) throw 'Shares must be a non zero value'

    // get realtime price
    const price: number | null = await getPrice(symbol)

    if (!price) throw `Unable to get ${symbol} price. Try again later`

    // check if sufficient shares
    const symbolShares = await getShares(symbol, user_id)
    
    if (symbolShares < shares) throw 'Insufficient shares of ' + symbolShares

    // add to database
    try {
        const buy: Trade = await prisma.trade.create({
            data: {
                price,
                shares: shares > 0 ? -(shares) : shares,
                symbol,
                user_id
            }
        })
        return buy
    } catch(err) {
        throw err
    }
}