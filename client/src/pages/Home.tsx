import { makeStyles, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import illust from '../assets/homeillustration.svg'

const Home = () => {
  const classes = useStyles()
  const [illustration, setIllustration] = useState<{x: number, y: number}>({x: 0, y: 0})

  useEffect(() => {
    function parallaxIllustration(e: any) {
      const x = (window.innerWidth - e.clientX * 1) / 100
      const y = (window.innerHeight - e.clientY * 1) / 100
      setIllustration({x, y})
    }

    document.addEventListener('mousemove', parallaxIllustration)
    return () => document.removeEventListener('mousemove', parallaxIllustration)
  })

  return (
      <Grid container className={classes.container}>
          <Grid item xs={12} md={6} className={classes.titleContainer}>
              <h3 className={classes.title}>Imporve your<br/><span>trading</span> skill with<br /> <span>zero capital</span></h3>
              <div className={classes.subtitleContainer}>
                  <div>Trade</div>
                  <ul className={classes.list}>
                      <li><span></span>Cryptocurrency</li>
                      <li><span></span>More soon</li>
                  </ul>
              </div>
          </Grid>
          <Grid item xs={12} md={6} className={classes.illustContainer}>
            <div style={{
                transform: `translateX(${illustration.x}px) translateY(${illustration.y}px)`
              }}>
              <img src={illust} alt="Fiato"/>
            </div>
          </Grid>
          <div className={classes.bgcircle} style={{
                transform: `translateX(${illustration.x}px) translateY(${illustration.y}px)`
              }}></div>
      </Grid>
  )
}

export default Home

const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 60px)',
  },
  title: {
    fontSize: 40,
    marginBottom: theme.spacing(4),
    '& span': {
      color: theme.palette.primary.main
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 50,
    },
  },
  titleContainer: {
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(10),
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      marginBottom: 0,
      display: 'block',
    }
  },
  subtitleContainer: {
    fontWeight: 400,
    fontSize: '1.2rem'
  },
  list: {
    padding: 0,
    '& li': {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
      margin: 0,
      padding: 0,
      marginBottom: '0.6rem',
      fontSize: '1.2rem'
    },
    '& span': {
      display: 'inline-block',
      width: '1rem',
      height: '1rem',
      borderRadius: '999px',
      backgroundColor: theme.palette.primary.main,
      marginRight: '2rem',
      opacity: 0.8
    },
  },
  illustContainer: {
    position: 'absolute',
    zIndex: -1,
    opacity: 0.05,
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      position: 'static',
      top: 0,
      zIndex: 0,
      opacity: 1,
    },
    '& img': {
      maxWidth: '100%',
      maxHeight: '700px',
      marginBottom: '30px',
    },
    '& > div': {
      position: 'absolute',
    },
  },
  bgcircle: {
    borderRadius: '999px',
    height: '400px',
    width: '400px',
    border: '60px solid rgba(58, 59, 65, 0.05)',
    position: 'absolute',
    left: '-100px',
    bottom: '90px',
  },
}))