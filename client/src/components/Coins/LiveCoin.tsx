import { useMutation } from '@apollo/client'
import React, { useMemo } from 'react'
import { ADD_WATCHLIST, REMOVE_WATCHLIST } from '../../graphql/mutations/watchlist'

interface Props {
    name: string
    price: string
}

const LiveCoin = ({ name, price }: Props) => {
    const priceMemo: string = useMemo(() => Number(price).toFixed(2), [price])
    const [ addWatchlist ] = useMutation(ADD_WATCHLIST)
    const [ removeWatchlist ] = useMutation(REMOVE_WATCHLIST)

    const handleAddWatchlist = async () => {
        await addWatchlist({ variables: { symbol: name } })
        alert(`${name} added to wishlist`)
    }

    const handleRemoveWatchlist = async () => {
        await removeWatchlist({ variables: { symbol: name } })
        alert(`${name} removed from watchlist`)
    }

    return (
        <div>
            <span style={{marginRight: '20px'}}>{name}</span>
            <span style={{color: 'gold', marginRight: '20px'}}>{priceMemo}</span>
            <button onClick={handleAddWatchlist}>Add to watchlist</button>
            <button onClick={handleRemoveWatchlist}>Remove from watchlist</button>
        </div>
    )
}

export default LiveCoin
