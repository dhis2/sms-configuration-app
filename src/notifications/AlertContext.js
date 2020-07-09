import { createContext } from 'react'

export const AlertContext = createContext({
    addAlert: () => {
        throw new Error('AlertContext has not been initialized yet!')
    },
})
