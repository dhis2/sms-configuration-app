import { useUpdateGatewayMutation } from './useUpdateGatewayMutation.js'

export const UPDATE_BULK_SMS_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'update',
    data: ({ name, username, password }) => {
        const data = {
            type: 'bulksms',
            name,
            username,
        }
        if (password) {
            data.password = password
        }
        return data
    },
}

export const useUpdateBulkSMSGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_BULK_SMS_GATEWAY_MUTATION)
