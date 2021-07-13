import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { gql, useMutation } from '@apollo/client'

const REMOVE_WATCHLIST = gql`
  mutation REMOVE_WATCHLIST($symbol: String!) {
    removeWatchlist(symbol: $symbol) {
      symbol
    }
  }
`

const MoreIcon = ({ id, refetch }: { id: string, refetch: any }) => {
  const classes = useStyles()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [ removeWatchlist ] = useMutation(REMOVE_WATCHLIST) 

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = async (type: string) => {
    setAnchorEl(null)
    switch (type) {
      case "details":
        return history.push(`/trade/${id}`)
      case "watchlist":
        try {
          await removeWatchlist({ variables: { symbol: id } })
          await refetch()
          alert(`${id} removed from watchlist`)
        } catch (err) {
          alert(err.message)
        }
        return
      default:
        return
    }
  }

  return (
    <div>
      <IconButton
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        className={classes.menu}
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleClose("details")}>Details</MenuItem>
        <MenuItem onClick={() => handleClose("watchlist")}>
          Remove to Watchlist
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MoreIcon

const useStyles = makeStyles({
  menu: {
    "& div:nth-of-type(3)": {
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
  },
})
