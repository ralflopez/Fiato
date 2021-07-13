import {
  makeStyles,
  Button,
  CircularProgress,
} from "@material-ui/core"
import useLiveCoins from "../hooks/useLiveCoins"
import CoinOnlinePriceTable from "../components/Tables/CoinOnlinePriceTable"

const Trade = () => {
  const classes = useStyles()
  const { loading, details, rank, setLimit } = useLiveCoins()

  return (
    <div className={classes.tradeContainer}>
      <CoinOnlinePriceTable 
        details={details}
        rank={rank}
      />
      {loading ? (
        <CircularProgress className={classes.morebutton} color='secondary' />
      ) : (
        <Button
          color='secondary'
          variant='contained'
          className={classes.morebutton}
          onClick={() => setLimit((limit: number) => limit + 10)}
        >
          More
        </Button>
      )}
    </div>
  )
}

export default Trade

const useStyles = makeStyles((theme) => ({
  morebutton: {
    margin: theme.spacing(5),
  },
  tradeContainer: {
    textAlign: "center",
  },
}))
