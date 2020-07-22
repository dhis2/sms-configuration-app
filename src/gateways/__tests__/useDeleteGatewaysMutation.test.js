import { act, renderHook } from '@testing-library/react-hooks'
import { useDataEngine } from '@dhis2/app-runtime'
import { useDeleteGatewaysMutation } from '../useDeleteGatewaysMutation'

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
                new Promise(resolve =>
                    setTimeout(() => {
                        resolve()
                        pending()
                    }, 1000)
                )
        )

        const ids = ['id1', 'id2', 'id3']
        const { result, wait, waitForNextUpdate } = renderHook(() =>
            useDeleteGatewaysMutation()
        )

        await act(async () => {
            const doMutate = result.current[0]
            doMutate({ ids })

            await wait(() => result.current[1].loading)
            expect(result.current[1].loading).toBe(true)
            expect(mutate).toHaveBeenCalledTimes(3)
            expect(pending).not.toHaveBeenCalled()

            await waitForNextUpdate()
            expect(result.current[1].loading).toBe(false)
            expect(pending).toHaveBeenCalled()
        })
    })
})
