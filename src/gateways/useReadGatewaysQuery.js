import { useDataQuery } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   Create Jira issues for:
 *   * The "fields" param does not work
 *   * id field is not present, only uid
 */
const GATEWAYS_QUERY = {
    gateways: {
        resource: 'gateways.json',
        params: {
            //fields: 'id,name,isDefault',
        },
    },
}

export const useReadGatewaysQuery = () => useDataQuery(GATEWAYS_QUERY)
