import React from "react"
import LiveCoin from "../components/Coins/LiveCoin"
import useLiveCoins from '../hooks/useLiveCoins'

const Page = () => {
  console.log('page')
  const { details, rank } = useLiveCoins()

  return (
    <div>
      <div>
        {
          details && rank.map((coinName: string) => (
            <LiveCoin key={coinName} name={coinName} price={details[coinName].priceUsd}/>
          ))
        }
      </div>
      <h1>Hello</h1>
    </div>
  )
}

export default Page
