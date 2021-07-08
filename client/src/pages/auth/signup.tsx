import React, { useReducer } from 'react'
import { useMutation } from '@apollo/client'
import { formInit, TFormFields, TFormFieldsAction } from './login.types'
import { Redirect } from 'react-router-dom'
import { REGISTER_USER } from '.././../graphql/mutations/auth'


const formReducer = (state: TFormFields, action: TFormFieldsAction): TFormFields => {
    switch(action.field) {
        case 'email': return {...state, email: action.value}
        case 'username': return {...state, username: action.value}
        case 'password': return {...state, password: action.value}
        case 'reset': return {...formInit}
        default: return {...state}
    }
}

const Signup = () => {
    const [formValues, dispatchForm] = useReducer(formReducer, formInit)
    const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER)

    // mutation handler
    if (loading) return <div>loading...</div>
    if (data) {
        return <Redirect to="/login" />
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const { username, email, password }: TFormFields = formValues
        try {
            await registerUser({ variables: {
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

export default Signup
