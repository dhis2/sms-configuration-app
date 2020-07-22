import { useDataMutation } from '@dhis2/app-runtime'
import {
    CREATE_GENERIC_GATEWAY_MUTATION,
    useCreateGenericGatewayMutation,
} from '../useCreateGenericGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

describe('gateways - useCreateGenericGatewayMutation', () => {
    afterEach(() => {
        useDataMutation.mockClear()
    })

    it('should return the return value of the useDataMutation function called with the correct query', () => {
        useDataMutation.mockReturnValue('foo')
        const returnedValue = useCreateGenericGatewayMutation()

        expect(returnedValue).toBe('foo')
        expect(useDataMutation).toHaveBeenCalledTimes(1)
        expect(useDataMutation).toHaveBeenCalledWith(
            CREATE_GENERIC_GATEWAY_MUTATION
        )
    })
})
