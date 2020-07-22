import { useDataMutation } from '@dhis2/app-runtime'

export const CREATE_CLICKATELL_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: ({ name, username, password, authtoken }) => ({
        type: 'clickatell',
        name,
        username,
        password,
        authtoken,
    }),
}

export const useCreateClickatellGatewayMutation = () =>
    useDataMutation(CREATE_CLICKATELL_GATEWAY_MUTATION)
