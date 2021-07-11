import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Logout from "./pages/auth/Logout"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Trade from './pages/Trade'
import CoinInfo from "./components/Trade/CoinInfo"

function App() {
  return (
    <Layout> 
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/logout' component={Logout} />
      <Route exact path='/trade' component={Trade} />
      <Route path='/trade/:id' component={CoinInfo} />
    </Layout>
  )
}

export default App
