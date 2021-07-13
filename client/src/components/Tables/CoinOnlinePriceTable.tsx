import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, makeStyles, Paper } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import MoreIcon from "../Trade/MoreIcon"

const CoinOnlinePriceTable = ({ details, rank }: any ) => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <TableContainer component={Paper} className={classes.shadow}>
        <Table>
          <TableHead>
            <TableRow className={classes.head}>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>24hr change</TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details &&
              rank.map((coinName: string, index: number) => (
                <TableRow
                  key={details[coinName].id}
                  className={classes.coinRow}
                >
                  <TableCell>{index + 1}</TableCell>
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
                    ${Number(details[coinName].priceUsd).toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={
                      Number(details[coinName].changePercent24Hr) > 0
                        ? classes.positive
                        : classes.negative
                    }
                  >
                    {Number(details[coinName].changePercent24Hr).toFixed(2)}%
                  </TableCell>
                  <TableCell>
                    <MoreIcon id={details[coinName].id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default CoinOnlinePriceTable

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