import React from "react"
import { ThemeProvider, CssBaseline, Grid } from "@material-ui/core"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { theme } from "../../styles/theme"
import AppBar from "../Appbar"
import NotFound from "../404"
import { Container } from "../../styles/component"

const Layout = ({ children }: any) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar />
        <Container maxWidth='lg'>
          <Grid item style={{ marginTop: "60px", minHeight: "400px" }}>
            <Switch>
              {children}
              <Route path='*' component={NotFound} />
            </Switch>
          </Grid>
        </Container>
      </Router>
    </ThemeProvider>
  )
}

export default Layout
