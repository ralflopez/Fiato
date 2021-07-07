interface TTrade {
    id?: number
    time?: Date
    user_id?: string
    user?: TUser
    symbol?: string
    shares?: number
}

interface TCashTransaction {
    id?: number
    amount?: number
    user_id?: string
    user?: TUser 
}

interface TWatchlist {
    id?: number
    user_id?: string
    user: TUser
    symbol: string
}

interface TUser {
    id?: string
    username?: string
    email?: string
    Trade?: TTrade[]
    CashTransaction: TCashTransaction[]
    Watchlist: TWatchlist[]
}