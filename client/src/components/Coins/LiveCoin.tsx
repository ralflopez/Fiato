import React, { useMemo } from 'react'

interface Props {
    name: string
    price: string
}

const LiveCoin = ({ name, price }: Props) => {
    const priceMemo: string = useMemo(() => Number(price).toFixed(2), [price])

    return (
        <div>
        <span style={{marginRight: '20px'}}>{name}</span>
        <span style={{color: 'gold'}}>{priceMemo}</span>
      </div>
    )
}

export default LiveCoin
