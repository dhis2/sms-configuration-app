import { useDataQuery } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   Create Jira issues for:
 *   * The "fields" param does not work
 *   * id field is not present, only uid
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
 * @TODO(filtering): Currently the `id:in:[...]` doesn't work
 *
 * @param {string[]} [ids]
 * @return {Object}
 */
export const useReadGatewaysQuery = ids => {
    const filter = `id:in:[${ids?.join(',')}]`
    // This is because filtering doesn't work right now
    // So there's no need for sending any variables
    // eslint-disable-next-line no-constant-condition
    const variables = false && ids ? { filter } : {}
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
