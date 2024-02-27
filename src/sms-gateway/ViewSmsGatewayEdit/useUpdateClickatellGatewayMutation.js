import { useUpdateGatewayMutation } from './useUpdateGatewayMutation.js'

export const UPDATE_CLICKATELL_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'update',
    data: ({ name, username, authToken, urlTemplate }) => {
        const data = {
            type: 'clickatell',
            name,
            username,
            urlTemplate,
        }
        if (authToken) {
            data.authToken = authToken
        }
        return data
    },
}

export const useUpdateClickatellGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_CLICKATELL_GATEWAY_MUTATION)
