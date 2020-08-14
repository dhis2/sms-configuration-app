import { useDataQuery } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   * The endpoint requires a `.json`, ignores "Accept" header
 *     -> https://jira.dhis2.org/browse/DHIS2-9250
 *   * The "fields" param does not work
 *     -> https://jira.dhis2.org/browse/DHIS2-9241
 *   * id field is not present, only uid
 *     -> https://jira.dhis2.org/browse/DHIS2-9249
 */
export const GATEWAYS_QUERY = {
    gateways: {
        resource: 'gateways.json',
        params: ({ fields, filter }) => {
            const params = {}

            if (fields) {
                params.fields = fields
            }

            if (filter) {
                params.filter = filter
            }

            return params
        },
    },
}

/**
 * @param {string[]} [ids]
 * @return {Object}
 */
export const useReadGatewaysQuery = ids => {
    /*
     * @TODO(filtering): Currently the `id:in:[...]` doesn't work
     *   -> https://jira.dhis2.org/browse/DHIS2-9259
     *
     * This is because filtering doesn't work right now
     * So there's no need for sending any variables
     */
    const filter = `id:in:[${ids?.join(',')}]`
    const variables = false && ids ? { filter } : {} // eslint-disable-line no-constant-condition
    const { data: jsonData, ...rest } = useDataQuery(GATEWAYS_QUERY, {
        variables,
    })

    const parsedData =
        /**
         * @TODO:
         *   Create Jira issue for:
         *   The response does not contain the right content type header
         */
        jsonData && typeof jsonData.gateways === 'string'
            ? { gateways: JSON.parse(jsonData.gateways) }
            : jsonData

    const data =
        ids && parsedData?.gateways?.gateways
            ? {
                  gateways: {
                      gateways: parsedData.gateways.gateways.filter(({ uid }) =>
                          ids.includes(uid)
                      ),
                  },
              }
            : parsedData

    return { data, ...rest }
}
