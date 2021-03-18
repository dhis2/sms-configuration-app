import { useDataQuery } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   * The "fields" param does not work
 *     -> https://jira.dhis2.org/browse/DHIS2-9241
 *   * id field is not present, only uid
 *     -> https://jira.dhis2.org/browse/DHIS2-9249
 *   * Api does not return password of BulkSMS gateway configs
 *     -> https://jira.dhis2.org/browse/DHIS2-9248
 */
export const GATEWAY_QUERY = {
    gateway: {
        resource: 'gateways',
        id: ({ id }) => id,
    },
}

export const useReadGatewayQuery = id =>
    useDataQuery(GATEWAY_QUERY, { variables: { id } })
