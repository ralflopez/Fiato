import React from "react"
import { Redirect } from "react-router-dom"
import cookie from "js-cookie"
import { cookieName } from "./Login"

const Logout = () => {
  cookie.remove(cookieName)
  return <Redirect to='/login' />
}

export default Logout
