import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import WatchlistTable from '../components/Tables/WatchlistTable'

const GET_WATCHLIST = gql`
    query GET_WATCHLIST {
        watchlist {
            symbol
        }
    }
`

const Watchlist = () => {
    const { loading, error, data, refetch } = useQuery(GET_WATCHLIST)

    useEffect(() => {
        refetch()
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>
    if (!data?.watchlist.length) return <div>Empty</div>
    console.log(data.watchlist)
    return (
        <div>
            <WatchlistTable data={data.watchlist} refetch={refetch} />
        </div>
    )
}

export default Watchlist
