/* eslint-disable react/prop-types */
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { AlertContext } from '../AlertContext'
import { useCriticalNotification } from '../useCriticalNotification'

describe('notifications - useCriticalNotification', () => {
    const addAlert = jest.fn()
    const wrapper = ({ children }) => (
        <AlertContext.Provider value={{ addAlert }}>
            {children}
        </AlertContext.Provider>
    )

    afterEach(() => {
        addAlert.mockClear()
    })

    it('should not call the addAlert function', () => {
        renderHook(() => useCriticalNotification(null), { wrapper })
        expect(addAlert).toHaveBeenCalledTimes(0)
    })

    it('should call the addAlert function', () => {
        const error = new Error('Error message')
        renderHook(() => useCriticalNotification(error), { wrapper })
        expect(addAlert).toHaveBeenCalledTimes(1)
        expect(addAlert).toHaveBeenCalledWith({
            type: 'critical',
            message: 'Error message',
        })
    })
})
