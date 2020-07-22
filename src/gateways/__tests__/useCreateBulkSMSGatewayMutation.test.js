import { useDataMutation } from '@dhis2/app-runtime'
import {
    CREATE_BULK_SMS_GATEWAY_MUTATION,
    useCreateBulkSMSGatewayMutation,
} from '../useCreateBulkSMSGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

describe('gateways - useCreateBulkSMSGatewayMutation', () => {
    it('should return the return value of the useDataMutation function called with the correct query', () => {
        useDataMutation.mockReturnValue('foo')
        const returnedValue = useCreateBulkSMSGatewayMutation()

        expect(returnedValue).toBe('foo')
        expect(useDataMutation).toHaveBeenCalledTimes(1)
        expect(useDataMutation).toHaveBeenCalledWith(
            CREATE_BULK_SMS_GATEWAY_MUTATION
        )
    })
})
