import { useDataQuery } from '@dhis2/app-runtime'
import { GATEWAY_QUERY, useReadGatewayQuery } from '../useReadGatewayQuery'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

describe('gateways - useReadGatewayQuery', () => {
    afterEach(() => {
        useDataQuery.mockClear()
    })

    it('should return the return value of the useDataQuery function called with the correct query', () => {
        useDataQuery.mockReturnValue('foo')
        const returnedValue = useReadGatewayQuery('ID')

        expect(returnedValue).toBe('foo')
        expect(useDataQuery).toHaveBeenCalledTimes(1)
        expect(useDataQuery).toHaveBeenCalledWith(GATEWAY_QUERY, {
            variables: { id: 'ID' },
        })
    })
})
