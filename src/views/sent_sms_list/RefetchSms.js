import { createContext } from 'react'

const message = 'RefetchSms consumer needs to have a valid Provider as parent'
const throwError = () => {
    throw new Error(message)
}

// Throws an error if the consumer is not nested in a provider
const RefetchSms = createContext({
    refetch: throwError,
    refetchAndClear: throwError,
})

export default RefetchSms
