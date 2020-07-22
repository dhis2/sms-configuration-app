import { useDataQuery } from '@dhis2/app-runtime'
import { GATEWAYS_QUERY, useReadGatewaysQuery } from '../useReadGatewaysQuery'

jest.mock('@dhis2/app-runtime', () => ({
    useDataQuery: jest.fn(),
}))

describe('gateways - useReadGatewayQuery', () => {
    afterEach(() => {
        useDataQuery.mockClear()
    })

    it('should return the return value of the useDataQuery function called with the correct query', () => {
        useDataQuery.mockReturnValue({ data: { gateways: '[]' }, foo: 'foo' })
        const returnedValue = useReadGatewaysQuery(['ID1', 'ID2'])

        expect(returnedValue).toEqual({ data: { gateways: [] }, foo: 'foo' })
        expect(useDataQuery).toHaveBeenCalledTimes(1)
        expect(useDataQuery).toHaveBeenCalledWith(GATEWAYS_QUERY, {
            variables: {},
        })
    })

    it('should parse the gateways JSON response', () => {
        const gateways = [{ uid: 'UID1' }, { uid: 'UID2' }]
        useDataQuery.mockReturnValue({
            data: { gateways: JSON.stringify(gateways) },
            foo: 'foo',
        })
        const returnedValue = useReadGatewaysQuery()

        expect(returnedValue.data.gateways).toEqual(gateways)
    })

    it('should filter the response on the client side', () => {
        const gateways = [
            {
                uid: 'UID1',
                name: 'Gateway configuration 1',
                isDefault: true,
            },
            {
                uid: 'UID2',
                name: 'Gateway configuration 2',
                isDefault: false,
            },
        ]

        useDataQuery.mockReturnValue({
            data: { gateways: JSON.stringify({ gateways }) },
            foo: 'foo',
        })

        const returnedValue = useReadGatewaysQuery(['UID2'])

        expect(returnedValue.data.gateways.gateways).toEqual([gateways[1]])
    })

    it('should add the fields param to the query when present in the variables', () => {
        const actual = GATEWAYS_QUERY.gateways.params({ fields: 'name' })
        const expected = expect.objectContaining({ fields: 'name' })

        expect(actual).toEqual(expected)
    })

    it('should not add the fields param to the query when not present in the variables', () => {
        const actual = GATEWAYS_QUERY.gateways.params({})
        expect(actual.fields).toBe(undefined)
    })

    it('should add the filter param to the query when present in the variables', () => {
        const actual = GATEWAYS_QUERY.gateways.params({
            filter: 'id:in:["UID1"]',
        })
        const expected = expect.objectContaining({ filter: 'id:in:["UID1"]' })

        expect(actual).toEqual(expected)
    })

    it('should not add the filter param to the query when not present in the variables', () => {
        const actual = GATEWAYS_QUERY.gateways.params({})
        expect(actual.filter).toBe(undefined)
    })
})
