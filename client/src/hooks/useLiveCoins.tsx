import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { TCoinDetails, TData } from "./useLiveCoins.type"

// reducer for the main data of the statr (TData)
const reducer = (state: TData, action: any) => {
  switch (action.type) {
    case "ALL":
      return { ...action.payload }
    case "NEW_PRICE":
      const newDetails: TData = { ...state }
      const keys = Object.keys(action.payload)
      keys.forEach(
        (coin: string) => {
          if (!newDetails.details[coin]) return
          newDetails.details[coin].priceUsd = action.payload[coin]
      })
      return newDetails
    default:
      return { ...state }
  }
}

// inital value of the reducer
const dataInit: TData = {
  assets: "",
  details: {},
  rank: [],
}

// converts an array of coin to a string eg. ['bitcoin', 'etherium'] => 'bitcoin,etherium,'
function parseCoinList(data: any[], selector: string) {
  return data?.reduce(
    (list: string, coin: any) => list + `${coin[selector]},`,
    ""
  ).slice(0, -1)
}

const useLiveCoins = (init?: Array<{[key: string]: string}> ) => {
  const parsedInit = init ? parseCoinList(init, 'symbol') : null
  const [{ assets, details, rank }, dispatchData] = useReducer(
    reducer,
    dataInit
  )
  const [limit, setLimit] = useState<number>(20)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {

    const fetchAssets = async () => {
      // get initial details
      const fromApi = await axios.get(
        init 
        ? `https://api.coincap.io/v2/assets?ids=${parsedInit}` 
        : `https://api.coincap.io/v2/assets?limit=${limit}`
      )
      const data = fromApi.data.data

      // format to dictionary to have O(1) access later
      const formatedData: any = {}
      const rank: string[] = []
      data.forEach((coin: TCoinDetails) => {
        // preserve rank
        rank.push(coin.id)

        // format data struct
        formatedData[coin.id] = { ...coin }
      })

      // convert keys to a long string
      const parsedAssets = parseCoinList(data, 'id')

      // store data
      dispatchData({
        type: "ALL",
        payload: {
          details: formatedData,
          rank: rank,
          assets: parsedAssets,
        },
      })
      setLoading(false)
    }

    fetchAssets()
  }, [limit, init, parsedInit])

  useEffect(() => {
    if (!assets) return

    // connect to ws
    const pricesWs = new WebSocket(
      `wss://ws.coincap.io/prices?assets=${assets}`
    )

    // listen to ws event
    pricesWs.onmessage = (msg) => {
      const newPrice = JSON.parse(msg.data)

      // update price
      dispatchData({
        type: "NEW_PRICE",
        payload: newPrice,
      })
    }

    setTimeout(() => pricesWs.close(), 10000)
  }, [assets])

  return { loading, details, rank, setLimit }
}

export default useLiveCoins
