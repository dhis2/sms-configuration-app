import { useDataQuery } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   Create Jira issues for:
 *   * The "fields" param does not work
 *   * id field is not present, only uid
 */
export const GATEWAY_QUERY = {
    gateway: {
        resource: 'gateways',
        id: ({ id }) => id,
    },
}

export const useReadGatewayQuery = id =>
    useDataQuery(GATEWAY_QUERY, { variables: { id } })
