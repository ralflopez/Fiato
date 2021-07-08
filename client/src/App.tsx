import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Logout from "./pages/auth/Logout"
import Home from "./pages/Home"
import Cash from "./pages/Cash"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/cash' component={Cash} />
      </Switch>
    </Router>
  )
}

export default App
