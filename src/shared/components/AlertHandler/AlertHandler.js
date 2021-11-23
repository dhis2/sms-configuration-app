import { PropTypes } from '@dhis2/prop-types'
import { AlertBar, AlertStack } from '@dhis2/ui'
import React, { useState } from 'react'
import { dataTest } from '../../utils/index.js'
import { AlertContext } from './AlertContext.js'

export const AlertHandler = ({ children }) => {
    const [alerts, setAlerts] = useState([])
    const addAlert = ({ message, type }) => {
        const alert = {
            message,
            type,
            // Ensure that identical messages can be distinguished
            timestamp: Date.now(),
        }

        setAlerts([...alerts, alert])
    }

    return (
        <AlertContext.Provider value={{ addAlert }}>
            {children}

            <AlertStack dataTest={dataTest('shared-alerthandler-alertstack')}>
                {alerts.map(({ message, type, timestamp }) => (
                    <AlertBar
                        dataTest={dataTest('shared-alerthandler-alertbar')}
                        key={`${message}${timestamp}`}
                        {...{ [type]: true }}
                    >
                        {message}
                    </AlertBar>
                ))}
            </AlertStack>
        </AlertContext.Provider>
    )
}

AlertHandler.propTypes = {
    children: PropTypes.any,
}
