import React, { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { useLocation } from "react-router-dom"
import { makeStyles } from "@material-ui/core"
import { Button } from "../../styles/component"

const CoinInfo = () => {
  const classes = useStyles()
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [info, setInfo] = useState<any>()

  useEffect(() => {
    axios
      .get(`https://api.coincap.io/v2/assets/${id}/`)
      .then((response: AxiosResponse) => {
        setInfo(response.data.data)
        console.log(response.data.data)
      })
      .catch((err) => console.log(err))
  }, [id])

  if (!info) return <div>Loading...</div>

  return (
    <div>
      <div className={classes.nameContainer}>
        <img
          src={`https://assets.coincap.io/assets/icons/${info.symbol.toLowerCase()}@2x.png`}
          alt={info.symbol}
          className={classes.coinIcon}
        />
        <h2>
          Bitcoin <span>{info.symbol}</span>
        </h2>
      </div>
      <div>
        <p>${Number(info.priceUsd).toFixed(2)}</p>
        <p>
          <span></span>
          {Number(info.changePercent24Hr).toFixed(2)}
        </p>
      </div>
      <div>
        <Button className={classes.buy} variant='contained'>
          Buy
        </Button>
        <Button className={classes.sell} variant='contained'>
          Sell
        </Button>
      </div>
    </div>
  )
}

export default CoinInfo

const useStyles = makeStyles((theme) => ({
  coinIcon: {
    width: "2rem",
    marginRight: "1rem",
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
    "& span": {
      fontWeight: 400,
      color: theme.palette.primary.main,
    },
  },
  buy: {
    backgroundColor: theme.palette.success.main,
    color: "white",
    marginRight: theme.spacing(1),
    "&:hover": {
      backgroundColor: "#28713F",
    },
  },
  sell: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:hover": {
      backgroundColor: "#D14624",
    },
  },
  positive: {
    color: theme.palette.success.main,
  },
  negative: {
    color: theme.palette.error.main,
  },
}))
