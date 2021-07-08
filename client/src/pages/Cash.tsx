import { useMutation, useQuery } from '@apollo/client'
import React, { useReducer } from 'react'
import { CASH_IN, CASH_OUT } from '../graphql/mutations/cashTransaction'
import { GET_CASH } from '../graphql/queries/getCash'

const formFieldsReducer = (state: any, action: any) => {
    switch(action.type) {
        case 'cashIn': return {...state, cashIn: action.value}
        case 'cashOut': return {...state, cashOut: action.value}
        default: return {...state}
    }
}

const Cash = () => {
    const [cashIn, { loading: cashInLoading , error: cashInError, data: cashInData }] = useMutation(CASH_IN)
    const [cashOut, { loading: cashOutLoading, error: cashOutError, data: cashOutData }] = useMutation(CASH_OUT)
    const [formFields, dispatchFormFields] = useReducer(formFieldsReducer, { cashIn: '', cashOut: ''})
    const { loading: cashLoading, error: cashError, data: cashData } = useQuery(GET_CASH)

    if (cashLoading || cashInLoading || cashOutLoading) return <div>Loading...</div>

    const handleCashIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await cashIn({ variables: { amount: +formFields.cashIn }})
    }

    const handleCashOut = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await cashOut({ variables: { amount: +formFields.cashOut }})
    }

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatchFormFields({
            type: e.target.name,
            value: e.target.value
        })
    }

    return (
        <>
            <div>
                <h1>{cashData && JSON.stringify(cashData)}</h1>
                <h1>{cashError && cashError?.message}</h1>
            </div>
            <div>
                <div>{cashInError && cashInError.message}</div>
                <div>{cashInData && JSON.stringify(cashInData)}</div>
                <form onSubmit={handleCashIn} method="POST">
                    <input 
                        type="number" 
                        name="cashIn" 
                        placeholder="Cash In"
                        value={formFields.cashIn} 
                        onChange={handleInputChange}
                    />
                    <input type="submit" />
                </form>
            </div>
            <div>
                <div>{cashOutError && cashOutError.message}</div>
                <div>{cashOutData && JSON.stringify(cashOutData)}</div>
                <form onSubmit={handleCashOut} method="POST">
                    <input 
                        type="number" 
                        name="cashOut" 
                        placeholder="Cash Out"
                        value={formFields.cashOut} 
                        onChange={handleInputChange}
                    />
                    <input type="submit" />
                </form>
            </div>

        </>
    )
}

export default Cash
