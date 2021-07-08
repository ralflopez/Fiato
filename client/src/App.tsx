//@ts-nocheck
import './App.css';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import Logout from './pages/auth/logout'
import Page from './pages/Page'

function App() {
  return (
    <Router>
      <Switch>
        <Link exact path="/" component={Page} />
        <Link exact path="/login" component={Login} />
        <Link exact path="/signup" component={Signup} />
        <Link exact path="/logout" component={Logout} />
      </Switch>
    </Router>
  );
}

export default App;
