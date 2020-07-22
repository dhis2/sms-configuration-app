import { useDataMutation } from '@dhis2/app-runtime'
import {
    UPDATE_CLICKATELL_GATEWAY_MUTATION,
    useUpdateClickatellGatewayMutation,
} from '../useUpdateClickatellGatewayMutation'

jest.mock('@dhis2/app-runtime', () => ({
    useDataMutation: jest.fn(),
}))

describe('gateways - useUpdateClickatellGatewayMutation', () => {
    it('should return the return value of the useDataMutation function called with the correct query', () => {
        useDataMutation.mockReturnValue('foo')
        const returnedValue = useUpdateClickatellGatewayMutation()

        expect(returnedValue).toBe('foo')
        expect(useDataMutation).toHaveBeenCalledTimes(1)
        expect(useDataMutation).toHaveBeenCalledWith(
            UPDATE_CLICKATELL_GATEWAY_MUTATION
        )
    })

    it('should pass the password to the data when present', () => {
        const name = 'Name'
        const username = 'User name'
        const password = 'Password'
        const authtoken = 'Auth token'
        const expected = {
            type: 'clickatell',
            name,
            username,
            password,
            authtoken,
        }
        const actual = UPDATE_CLICKATELL_GATEWAY_MUTATION.data({
            name,
            username,
            password,
            authtoken,
        })

        expect(actual).toEqual(expected)
    })
})
