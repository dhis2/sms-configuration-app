import { useUpdateGatewayMutation } from './useUpdateGatewayMutation.js'

export const UPDATE_CLICKATELL_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'update',
    data: ({ name, username, authToken, urlTemplate }) => ({
        type: 'clickatell',
        name,
        username,
        authToken,
        urlTemplate,
    }),
}

export const useUpdateClickatellGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_CLICKATELL_GATEWAY_MUTATION)
