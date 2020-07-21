import { useDataMutation } from '@dhis2/app-runtime'

const SAVE_BULK_SMS_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: ({ name, username, password }) => ({
        type: 'bulksms',
        name,
        username,
        password,
    }),
}

export const useCreateBulkSMSGatewayMutation = () =>
    useDataMutation(SAVE_BULK_SMS_GATEWAY_MUTATION)
