import MoreVertIcon from "@material-ui/icons/MoreVert"
import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { gql, useMutation } from '@apollo/client'

const ADD_WATCHLIST = gql`
  mutation ADD_WATCHLIST($symbol: String!) {
    addWatchlist(symbol: $symbol) {
      symbol
    }
  }
`

const MoreIcon = ({ id }: { id: string }) => {
  const classes = useStyles()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [ addWatchlist ] = useMutation(ADD_WATCHLIST) 

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
          await addWatchlist({ variables: { symbol: id } })
          alert(`Added ${id} to watchlist`)
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
          Add to Watchlist
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
