import { prisma } from "../../../../db/prisma/client";
import axios from 'axios'

// returns current balance of a user (not graphql)
export const getBalance = async (user_id: string) => {
    try {
        const resp = await prisma.$queryRaw`
        SELECT 
            COALESCE(
                (
                    SELECT SUM(amount) 
                    FROM "CashTransaction" 
                    GROUP BY user_id 
                    HAVING user_id = ${user_id}
                ), 0
            ) - 
            COALESCE(
                (
                    SELECT SUM(price * shares)
                    FROM "Trade"
                    GROUP BY user_id
                    HAVING user_id = ${user_id}
                ), 0
            ) 
        AS balance;
        `

        const balance = resp[0].balance
        return balance
    } catch (err) {
        return null
    }
}

export const getPrice = async (symbol: string) => {
    try {
        const { data } = await axios.get(`https://api.coincap.io/v2/assets/${symbol}`)
        const price = Number(data.data.priceUsd)
        return price
    } catch(err) {
        return null
    }
}

export const getShares = async (symbol: string, user_id: string) => {
    try {
        const res = await prisma.trade.groupBy({
            by: ['user_id', 'symbol', 'shares'],
            _sum: {
                shares: true
            },
            where: {
                user_id,
            },
            having: {
                shares: {
                    gt: 0,
                },
                symbol: {
                    equals: symbol
                },
            }
        })
        const shares = res[0].shares
        return shares
    } catch(err) {
        return 0
    }
}