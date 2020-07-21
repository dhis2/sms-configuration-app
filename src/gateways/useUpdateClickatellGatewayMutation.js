import { useDataMutation } from '@dhis2/app-runtime'

const SAVE_CLICKATELL_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'update',
    data: ({ name, username, password, authtoken }) => {
        const data = {
            type: 'clickatell',
            name,
            username,
            authtoken,
        }

        // @TODO(clickatell password): should the password be re-entered?
        if (password) {
            data.password = password
        }

        return data
    },
}

export const useUpdateClickatellGatewayMutation = () =>
    useDataMutation(SAVE_CLICKATELL_GATEWAY_MUTATION)
