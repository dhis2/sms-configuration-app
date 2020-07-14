import { useEffect } from 'react'

export const useCriticalNotification = (addAlert, error) =>
    useEffect(() => {
        if (error) {
            addAlert({ type: 'critical', message: error.message })
        }
    }, [error])
