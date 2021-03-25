import { useDataMutation } from '@dhis2/app-runtime'

export const SET_DEFAULT_GATEWAY_MUTATION = {
    resource: 'gateways/default',
    type: 'replace',
    id: ({ id }) => id,
}

export const useSetDefaultGatewayMutation = () =>
    useDataMutation(SET_DEFAULT_GATEWAY_MUTATION)
