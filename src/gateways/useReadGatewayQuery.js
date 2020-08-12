import { useDataQuery } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   * The "fields" param does not work (https://jira.dhis2.org/browse/DHIS2-9241)
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
