import { Container, makeStyles, Box } from '@material-ui/core'
import React from 'react'

const NotFound = () => {
    const classes = useStyles()

    return (
        <Container maxWidth="lg">
            <Box paddingTop="2rem" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                <p className={classes.title}>Fiat<span className={classes.textPrimary}>o</span></p>
                <h5 className={classes.code}>404</h5>
                <p className={classes.description}>Page not found</p>
            </Box>
        </Container>
    )
}

export default NotFound

const useStyles = makeStyles(theme => ({
    textPrimary: {
        color: theme.palette.primary.main
    },
    title: {
        fontSize: '1.5rem',
        margin: 0,
    },
    code: {
        fontSize: '4rem',
        margin: 0
    },
    description: {
        fontSize: '1.25rem',
        margin: 0
    }
}))
