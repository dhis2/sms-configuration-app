import { act, renderHook } from '@testing-library/react-hooks'
import { useDataEngine } from '@dhis2/app-runtime'
import {
    UPDATE_BULK_SMS_GATEWAY_MUTATION,
    useUpdateBulkSMSGatewayMutation,
} from '../useUpdateBulkSMSGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

describe('gateways - useUpdateBulkSMSGatewayMutation', () => {
    const variables = {
        id: 'ID1',
        name: 'Name',
        username: 'User name',
        password: 'Password',
    }

    const engine = {
        // delay is needed so loading can switch from false to true to false.
        // Otherwise react will collect the changes and dispatch them in one batch
        // which will cause the loading state to be false as the mutate function
        // resolves immediately.
        mutate: jest.fn(
            () => new Promise(resolve => setTimeout(() => resolve, 1000))
        ),
    }

    useDataEngine.mockImplementation(() => engine)

    afterEach(() => {
        engine.mutate.mockClear()
    })

    it('should return the loading state', () => {
        const { result } = renderHook(() => useUpdateBulkSMSGatewayMutation())
        expect(result.current[1].loading).toBe(false)
    })

    it('should return the error state', () => {
        const { result } = renderHook(() => useUpdateBulkSMSGatewayMutation())
        expect(result.current[1].error).toBe(null)
    })

    it('should return the refetch function', () => {
        const { result } = renderHook(() => useUpdateBulkSMSGatewayMutation())
        expect(typeof result.current[0]).toBe('function')
    })

    it('executing the mutate function should change loading to true', async () => {
        const { result, wait } = renderHook(() =>
            useUpdateBulkSMSGatewayMutation()
        )

        await act(async () => {
            result.current[0](variables)

            await wait(() => result.current[1].loading)
            expect(result.current[1].loading).toBe(true)
        })
    })

    it('executing the mutate function should reset the error', async () => {
        engine.mutate.mockImplementationOnce(() => Promise.reject('Error'))

        const { result, wait } = renderHook(() =>
            useUpdateBulkSMSGatewayMutation()
        )

        // first set the error
        await act(async () => {
            expect(result.current[1].error).toBe(null)
            result.current[0](variables).catch(() => Promise.resolve())
            await wait(() => result.current[1].error)
            expect(result.current[1].error).toBe('Error')
        })

        // Then call the mutate function
        await act(async () => {
            result.current[0](variables)
            await wait(() => result.current[1].loading)
            expect(result.current[1].error).toBe(null)
        })
    })

    it('should provide the correct parameters', () => {
        expect(UPDATE_BULK_SMS_GATEWAY_MUTATION.data(variables)).toEqual({
            type: 'bulksms',
            name: 'Name',
            username: 'User name',
            password: 'Password',
        })
    })
})
