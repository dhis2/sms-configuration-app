import { dataTest } from '../dataTest'

describe('dataTest', () => {
    it('should prepend the org and appname', () => {
        const expected = 'prefix-data-test-name'
        const actual = dataTest('data-test-name', 'prefix')
        expect(actual).toBe(expected)
    })

    it('should use the default prefix if none is provided', () => {
        const expected = 'dhis2-smsconfiguration-data-test-name'
        const actual = dataTest('data-test-name')
        expect(actual).toBe(expected)
    })
})
