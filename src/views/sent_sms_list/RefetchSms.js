import { createContext } from 'react'

const message = 'RefetchSms consumer needs to have a valid Provider as parent'

// Throws an error if the consumer is not nested in a provider
const RefetchSms = createContext(() => {
    throw new Error(message)
})

export default RefetchSms
