import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Logout from "./pages/auth/Logout"
import Home from "./pages/Home"
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { theme } from "./styles/theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/logout' component={Logout} />
          {/* <Route exact path='/cash' component={Cash} /> */}
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
