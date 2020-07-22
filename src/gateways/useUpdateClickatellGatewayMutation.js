import { useDataMutation } from '@dhis2/app-runtime'

export const UPDATE_CLICKATELL_GATEWAY_MUTATION = {
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
    useDataMutation(UPDATE_CLICKATELL_GATEWAY_MUTATION)
