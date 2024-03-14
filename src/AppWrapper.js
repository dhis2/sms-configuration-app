import './locales/index.js'
import { CssVariables } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { AlertHandler, FeatureToggleProvider } from './shared/index.js'

export const AppWrapper = ({ children }) => (
    <AlertHandler>
        <CssVariables spacers colors />
        <HashRouter>
            <FeatureToggleProvider>
                <QueryParamProvider ReactRouterRoute={Route}>
                    {children}
                </QueryParamProvider>
            </FeatureToggleProvider>
        </HashRouter>
    </AlertHandler>
)

AppWrapper.propTypes = {
    children: PropTypes.any.isRequired,
}
