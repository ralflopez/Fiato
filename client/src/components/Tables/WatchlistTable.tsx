import { Paper, TableCell, TableContainer, TableHead, TableRow, Table, TableBody, makeStyles } from '@material-ui/core'
import { useHistory } from 'react-router'
import useLiveCoins from '../../hooks/useLiveCoins'
import MoreIcon from '../Watchlist/MoreIcon'

const WatchlistTable = ({ data , refetch }: { data: Array<{[key: string]: string}>, refetch: any } ) => {
    const classes = useStyles()
    const history = useHistory()
    const { loading, details, rank } = useLiveCoins(data)

    if (loading) return <div>Loading...</div>
    if (!data.length) return <div></div>

    return (
        <div>
          <TableContainer component={Paper} className={classes.shadow}>
            <Table>
              <TableHead>
                <TableRow className={classes.head}>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell> </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details &&
                  rank.map((coinName: string) => (
                    <TableRow
                      key={details[coinName].id}
                      className={classes.coinRow}
                    >
                      <TableCell
                        onClick={() =>
                          history.push(`/trade/${details[coinName].id}`)
                        }
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={`https://assets.coincap.io/assets/icons/${details[
                              coinName
                            ].symbol.toLowerCase()}@2x.png`}
                            alt={details[coinName].symbol}
                            className={classes.coinIcon}
                          />
                          <span>
                            {details[coinName].name} ({details[coinName].symbol})
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        ${Number(details[coinName]?.priceUsd).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <MoreIcon id={details[coinName].id} refetch={refetch} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>      
        </div>
    )
}

export default WatchlistTable

const useStyles = makeStyles((theme) => ({
    coinIcon: {
      width: "1.2rem",
      marginRight: "0.6rem",
    },
    head: {
      fontWeight: 700,
    },
    coinRow: {
      transition: "all 150ms ease-in",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: theme.palette.grey[200],
      },
    },
    positive: {
      color: theme.palette.success.main,
    },
    negative: {
      color: theme.palette.error.main,
    },
    morebutton: {
      margin: theme.spacing(5),
    },
    tradeContainer: {
      textAlign: "center",
    },
    shadow: {
      boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.08) !important",
    },
  }))
