import { useDataMutation } from '@dhis2/app-runtime'
import {
    CREATE_CLICKATELL_GATEWAY_MUTATION,
    useCreateClickatellGatewayMutation,
} from '../useCreateClickatellGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

describe('gateways - useCreateClickatellGatewayMutation', () => {
    it('should return the return value of the useDataMutation function called with the correct query', () => {
        useDataMutation.mockReturnValue('foo')
        const returnedValue = useCreateClickatellGatewayMutation()

        expect(returnedValue).toBe('foo')
        expect(useDataMutation).toHaveBeenCalledTimes(1)
        expect(useDataMutation).toHaveBeenCalledWith(
            CREATE_CLICKATELL_GATEWAY_MUTATION
        )
    })
})
