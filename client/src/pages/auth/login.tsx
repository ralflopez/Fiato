import React, { useReducer } from 'react'
import { gql, useMutation } from '@apollo/client'
import { formInit, TFormFields, TFormFieldsAction } from './login.types'
import { Redirect } from 'react-router-dom'
import cookie from 'js-cookie'

const LOGIN_USER = gql`
  mutation Login($username: String, $email: String, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
    }
}
`

export const cookieName: string = 'afcicaetsostoken'

const formReducer = (state: TFormFields, action: TFormFieldsAction): TFormFields => {
    switch(action.field) {
        case 'email': return {...state, email: action.value}
        case 'username': return {...state, username: action.value}
        case 'password': return {...state, password: action.value}
        case 'reset': return {...formInit}
        default: return {...state}
    }
}

const Login = () => {
    const [formValues, dispatchForm] = useReducer(formReducer, formInit)
    const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER)

    // mutation handler
    if (loading) return <div>loading...</div>
    if (data) {
        cookie.set(cookieName, data?.login.token)
        return <Redirect to="/" />
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { username, email, password }: TFormFields = formValues
        try {
            await loginUser({ variables: {
                username,
                email,
                password,
            }})
            dispatchForm({ field: 'reset', value: '' })
        } catch(err) {}
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchForm({ 
            field: e.target.name, 
            value: e.target.value 
        })
    }


    return (
        <div>
            <div>{error && error.message}</div>
            <h2>{JSON.stringify(data || {})}</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    name="username" 
                    type="text" 
                    placeholder="Username"
                    autoComplete="off"
                    value={formValues.username}
                    onChange={handleFormChange} 
                />
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email"
                    autoComplete="off"
                    value={formValues.email}
                    onChange={handleFormChange} 
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password"
                    autoComplete="off"
                    value={formValues.password}
                    onChange={handleFormChange} 
                />
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login
