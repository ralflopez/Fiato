import { gql } from "@apollo/client";

export const GET_CASH = gql`
    query GET_CASH {
        getCash {
            cash
        }
    }
`