export interface TData {
    assets: string
    details: { [key: string]: any }
    rank: string[]
}
  
export interface TCoinDetails {
    id: string
    rank: string
    symbol: string
    priceUsd: string
    changePercent24Hr: string
    supply: string
    maxSupply: string
    marketCapUsd: string
    volumeUsd24Hr: string
}