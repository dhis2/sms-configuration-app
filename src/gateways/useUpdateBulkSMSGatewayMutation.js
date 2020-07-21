import { useDataMutation } from '@dhis2/app-runtime'

const SAVE_BULK_SMS_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'update',
    data: ({ name, username, password }) => {
        const data = {
            type: 'bulksms',
            name,
            username,
        }

        // @TODO(bulksms password): should the password be re-entered?
        if (password) {
            data.password = password
        }

        return data
    },
}

export const useUpdateBulkSMSGatewayMutation = () =>
    useDataMutation(SAVE_BULK_SMS_GATEWAY_MUTATION)
