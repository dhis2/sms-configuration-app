import { useDataMutation } from '@dhis2/app-runtime'
import {
    UPDATE_GENERIC_GATEWAY_MUTATION,
    useUpdateGenericGatewayMutation,
} from '../useUpdateGenericGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

describe('gateways - useUpdateGenericGatewayMutation', () => {
    it('should return the return value of the useDataMutation function called with the correct query', () => {
        useDataMutation.mockReturnValue('foo')
        const returnedValue = useUpdateGenericGatewayMutation()

        expect(returnedValue).toBe('foo')
        expect(useDataMutation).toHaveBeenCalledTimes(1)
        expect(useDataMutation).toHaveBeenCalledWith(
            UPDATE_GENERIC_GATEWAY_MUTATION
        )
    })

    it('should pass the password to the data when present', () => {
        const name = 'Name'
        const messageParameter = 'Message parameter'
        const recipientParameter = 'Recipient parameter'
        const urlTemplate = 'http://domain.tld'
        const parameters = []

        const expected = {
            type: 'http',
            name,
            messageParameter,
            recipientParameter,
            urlTemplate,
            parameters,
        }

        const actual = UPDATE_GENERIC_GATEWAY_MUTATION.data({
            name,
            messageParameter,
            recipientParameter,
            urlTemplate,
            parameters,
        })

        expect(actual).toEqual(expected)
    })
})
