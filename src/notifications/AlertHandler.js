import { AlertBar, AlertStack } from '@dhis2/ui'
import React, { useState } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { AlertContext } from './AlertContext'

export const AlertHandler = ({ children }) => {
    const [alerts, setAlerts] = useState([])
    const addAlert = alert => setAlerts([...alerts, alert])

    return (
        <AlertContext.Provider value={{ addAlert }}>
            {children}

            <AlertStack>
                {alerts.map(({ message, type }) => (
                    <AlertBar key={message} {...{ [type]: true }}>
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
