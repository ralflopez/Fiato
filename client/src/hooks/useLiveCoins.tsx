import axios from 'axios'
import { useEffect, useReducer } from 'react'
import { TCoinDetails, TData } from './useLiveCoins.type'

// reducer for the main data of the statr (TData)
const reducer = (state: TData, action: any) => {
  switch(action.type) {
    case 'ALL': return {...action.payload}
    case 'NEW_PRICE':
        const newDetails: TData = {...state}
        const keys = Object.keys(action.payload)
        keys.forEach((coin: string) => newDetails.details[coin].priceUsd = action.payload[coin])
        return newDetails
    default: return {...state}
  }
}

// inital value of the reducer
const dataInit: TData = {
  assets: '',
  details: {},
  rank: []
}

const useLiveCoins = () => {
    const [{ assets, details, rank }, dispatchData] = useReducer(reducer, dataInit)

    useEffect(() => {
      const fetchAssets = async () => {
        // get initial details
        const fromApi = await axios.get('https://api.coincap.io/v2/assets?limit=100')
        const data = fromApi.data.data

        // format to dictionary to have O(1) access later
        const formatedData: any = {}
        const rank: string[] = []
        data.forEach((coin: TCoinDetails) => {

          // preserve rank
          rank.push(coin.id)

          // format data struct
          formatedData[coin.id] = {...coin}
        })

        // convert keys to a long string
        const parsedAssets = data?.reduce((list: string, coin: any) => list + `${coin.id},`, '')
        
        // store data
        dispatchData({
          type: 'ALL', 
          payload: {
            details: formatedData,
            rank: rank,
            assets: parsedAssets
          }
        })
      }

      fetchAssets()
    }, [])

    useEffect(() => {
      if (!assets) return
        // connect to ws
        const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assets}`)
    
        // listen to ws event
        pricesWs.onmessage = (msg) => {
          const newPrice = JSON.parse(msg.data)
          
          // update price
          dispatchData({
            type: 'NEW_PRICE',
            payload: newPrice
          })

        }

        setTimeout(() => pricesWs.close(), 10000)
    }, [assets])

    return { details, rank }
}

export default useLiveCoins
