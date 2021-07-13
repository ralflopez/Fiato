import {
  makeStyles,
  Box,
  Drawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core"
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "../../styles/component"
import Hamburger from "./Hamburger"
import {
  Home as HomeIcon,
  MonetizationOn,
  AccountBalance,
  Visibility,
} from "@material-ui/icons"
import { Container } from "../../styles/component"

const AppBar = () => {
  const { pathname } = useLocation()
  const classes = useStyles()
  const [isNavbar, setNavbar] = useState<boolean>(false)

  return (
    <div className={classes.container}>
      <Container maxWidth='lg' className={classes.container2}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          height='60px'
        >
          <Link to='/' className={classes.link} style={{ marginLeft: 0 }}>
            <p className={classes.title}>
              Fiat<span className={classes.textPrimary}>o</span>
            </p>
          </Link>
          <Hamburger active={isNavbar} onClick={() => setNavbar(!isNavbar)} />
          <nav className={classes.navSection}>
            <ul className={classes.nav}>
              <li>
                <Link
                  to='/'
                  className={`${classes.link} ${pathname === "/" && "active"}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to='/trade'
                  className={`${classes.link} ${
                    pathname.includes("/trade") && "active"
                  }`}
                >
                  Trade
                </Link>
              </li>
              <li>
                <Link
                  to='/watchlist'
                  className={`${classes.link} ${
                    pathname.includes("/watchlist") && "active"
                  }`}
                >
                  Watchlist
                </Link>
              </li>
              <li>
                <Link
                  to='/portfolio'
                  className={`${classes.link} ${
                    pathname === "/portfolio" && "active"
                  }`}
                >
                  <Button color='primary' variant='contained' size='small'>
                    Portfolio
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </Box>
        <Drawer
          anchor='left'
          open={isNavbar}
          onClose={() => {
            setNavbar(!isNavbar)
          }}
        >
          <div className={classes.logodraw}>
            <p className={classes.title}>
              Fiat<span className={classes.textPrimary}>o</span>
            </p>
          </div>
          <Divider />
          <div onClick={() => setNavbar(!isNavbar)}>
            <List>
              <Link to='/' className={classes.linkdraw}>
                <ListItem button>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText primary='Home' />
                </ListItem>
              </Link>
              <Link to='/trade' className={classes.linkdraw}>
                <ListItem button>
                  <ListItemIcon>
                    <MonetizationOn />
                  </ListItemIcon>
                  <ListItemText primary='Trade' />
                </ListItem>
              </Link>
              <Link to='/watchlist' className={classes.linkdraw}>
                <ListItem button>
                  <ListItemIcon>
                    <Visibility />
                  </ListItemIcon>
                  <ListItemText primary='Watchlist' />
                </ListItem>
              </Link>
              <Link to='/portfolio' className={classes.linkdraw}>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBalance />
                  </ListItemIcon>
                  <ListItemText primary='Portfolio' />
                </ListItem>
              </Link>
            </List>
          </div>
        </Drawer>
      </Container>
    </div>
  )
}

export default AppBar

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
  container2: {
    background: "rgba(247, 246, 253, 0.5)",
    backdropFilter: "blur(30px)",
  },
  link: {
    textDecoration: "none",
    marginLeft: theme.spacing(4),
    color: theme.palette.common.black,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    "&.active": {
      fontWeight: "bold",
    },
  },
  navSection: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  nav: {
    display: "flex",
    alignItems: "center",
    margin: 0,
    "& li": {
      listStyle: "none",
    },
  },
  li: {
    listStyle: "none",
  },
  textPrimary: {
    color: theme.palette.primary.main,
  },
  title: {
    fontSize: "1.5em",
    margin: "0",
  },
  linkdraw: {
    textDecoration: "none",
    color: theme.palette.common.black,
    "& > div": {
      paddingLeft: "3rem",
      paddingRight: "3rem",
    },
  },
  logodraw: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
}))
