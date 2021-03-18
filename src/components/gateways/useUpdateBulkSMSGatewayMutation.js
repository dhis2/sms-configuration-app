import { useUpdateGatewayMutation } from './useUpdateGatewayMutation'

export const UPDATE_BULK_SMS_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'update',
    data: ({ name, username, password }) => ({
        type: 'bulksms',
        name,
        username,
        password,
    }),
}

export const useUpdateBulkSMSGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_BULK_SMS_GATEWAY_MUTATION)
