import { useDataMutation } from '@dhis2/app-runtime'
import {
    SET_DEFAULT_GATEWAY_MUTATION,
    useSetDefaultGatewayMutation,
} from '../useSetDefaultGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

describe('gateways - useCreateBulkSMSGatewayMutation', () => {
    it('should return the return value of the useDataMutation function called with the correct query', () => {
        useDataMutation.mockReturnValue('foo')
        const returnedValue = useSetDefaultGatewayMutation()

        expect(returnedValue).toBe('foo')
        expect(useDataMutation).toHaveBeenCalledTimes(1)
        expect(useDataMutation).toHaveBeenCalledWith(
            SET_DEFAULT_GATEWAY_MUTATION
        )
    })

    it('should pass the id from the variables to the resource', () => {
        const id = SET_DEFAULT_GATEWAY_MUTATION.id({ id: 'ID1' })
        expect(id).toBe('ID1')
    })
})
