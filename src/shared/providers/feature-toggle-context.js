import { createContext } from 'react'

const FeatureToggleContext = createContext({
    disableConfidentialEdit: false,
})

export { FeatureToggleContext }
