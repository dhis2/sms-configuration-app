import { useContext, useEffect } from 'react'
import { AlertContext } from './AlertContext'

/**
 * @param {Error} error
 * @returns {void}
 */
export const useCriticalNotification = error => {
    const { addAlert } = useContext(AlertContext)

    useEffect(() => {
        if (error) {
            addAlert({ type: 'critical', message: error.message })
        }
    }, [error])
}
