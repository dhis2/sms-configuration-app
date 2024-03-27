import { useConfig } from '@dhis2/app-runtime'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { FeatureToggleContext } from './feature-toggle-context.js'

const FeatureToggleProvider = ({ children }) => {
    const { serverVersion } = useConfig()

    const providerValue = {
        disableConfidentialEdit: serverVersion?.minor >= 39,
    }

    return (
        <FeatureToggleContext.Provider value={providerValue}>
            {children}
        </FeatureToggleContext.Provider>
    )
}

FeatureToggleProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { FeatureToggleProvider }
