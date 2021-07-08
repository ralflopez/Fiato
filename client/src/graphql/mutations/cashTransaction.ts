import { gql } from '@apollo/client'

export const CASH_IN = gql`
    mutation CASH_IN($amount: Float!) {
        cashIn(amount: $amount) {
            amount
        }
    }
`

export const CASH_OUT = gql`
    mutation CASH_OUT($amount: Float!) {
        cashOut(amount: $amount) {
            amount
        }
    }
`