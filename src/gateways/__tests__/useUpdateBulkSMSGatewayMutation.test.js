import { useDataMutation } from '@dhis2/app-runtime'
import {
    UPDATE_BULK_SMS_GATEWAY_MUTATION,
    useUpdateBulkSMSGatewayMutation,
} from '../useUpdateBulkSMSGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

describe('gateways - useUpdateBulkSMSGatewayMutation', () => {
    it('should return the return value of the useDataMutation function called with the correct query', () => {
        useDataMutation.mockReturnValue('foo')
        const returnedValue = useUpdateBulkSMSGatewayMutation()

        expect(returnedValue).toBe('foo')
        expect(useDataMutation).toHaveBeenCalledTimes(1)
        expect(useDataMutation).toHaveBeenCalledWith(
            UPDATE_BULK_SMS_GATEWAY_MUTATION
        )
    })

    it('should pass the password to the data when present', () => {
        const name = 'Name'
        const username = 'User name'
        const password = 'Password'
        const expected = { type: 'bulksms', name, username, password }
        const actual = UPDATE_BULK_SMS_GATEWAY_MUTATION.data({
            name,
            username,
            password,
        })

        expect(actual).toEqual(expected)
    })
})
