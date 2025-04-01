import { useDataEngine } from '@dhis2/app-runtime'
import { act, renderHook, waitFor } from '@testing-library/react'
import { useDeleteGatewaysMutation } from '../useDeleteGatewaysMutation.js'

jest.mock('@dhis2/app-runtime', () => ({
    useDataEngine: jest.fn(),
}))

describe('', () => {
    const mutate = jest.fn(() => Promise.resolve({}))

    beforeEach(() => {
        useDataEngine.mockImplementation(() => ({
            mutate,
        }))
    })

    afterEach(() => {
        mutate.mockClear()
    })

    it('should return the mutation function and loading states', () => {
        const { result } = renderHook(() => useDeleteGatewaysMutation())
        const [mutate, { loading, error }] = result.current

        expect(typeof mutate).toBe('function')
        expect(loading).toBe(false)
        expect(error).toBe(null)
    })

    it('should keep loading until all mutations have finished', async () => {
        // with the "pending" mock we can assert that loading is only false
        // after all three mutations have completed
        const pending = jest.fn()
        mutate.mockImplementationOnce(
            () =>
                new Promise(
                    (resolve) =>
                        setTimeout(() => {
                            resolve()
                            pending()
                        }, 500) // less than the 1000ms timeout of waitFor()
                )
        )

        const ids = ['id1', 'id2', 'id3']
        const { result } = renderHook(() => useDeleteGatewaysMutation())

        await act(async () => {
            const doMutate = result.current[0]
            doMutate({ ids })
        })

        expect(result.current[1].loading).toBe(true)
        expect(mutate).toHaveBeenCalledTimes(3)
        expect(pending).not.toHaveBeenCalled()

        await waitFor(() => {
            expect(result.current[1].loading).toBe(false)
            expect(pending).toHaveBeenCalled()
        })
    })
})
