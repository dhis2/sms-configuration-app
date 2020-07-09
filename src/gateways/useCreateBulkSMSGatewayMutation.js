import { useDataMutation } from '@dhis2/app-runtime'

const SAVE_BULK_SMS_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: {
        type: 'bulksms',
        name: ({ name }) => name,
        username: ({ username }) => username,
        password: ({ password }) => password,
    },
}

export const useCreateBulkSMSGatewayMutation = () =>
    useDataMutation(SAVE_BULK_SMS_GATEWAY_MUTATION)
