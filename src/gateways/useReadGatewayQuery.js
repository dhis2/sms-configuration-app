import { useDataQuery } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   Create Jira issues for:
 *   * The "fields" param does not work
 *   * id field is not present, only uid
 */
const GATEWAYS_QUERY = {
    gateway: {
        resource: 'gateways',
        id: ({ id }) => id,
    },
}

export const useReadGatewayQuery = id =>
    useDataQuery(GATEWAYS_QUERY, { variables: { id } })
