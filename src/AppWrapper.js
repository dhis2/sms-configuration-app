import './locales'
import { CssVariables } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { AlertHandler } from './shared/components/notifications'

export const AppWrapper = ({ children }) => (
    <AlertHandler>
        <CssVariables spacers colors />
        <HashRouter>
            <QueryParamProvider ReactRouterRoute={Route}>
                {children}
            </QueryParamProvider>
        </HashRouter>
    </AlertHandler>
)

AppWrapper.propTypes = {
    children: PropTypes.any.isRequired,
}
