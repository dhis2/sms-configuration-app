import { useDataMutation } from '@dhis2/app-runtime'

const SAVE_CLICKATELL_GATEWAY_MUTATION = {
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
    useDataMutation(SAVE_CLICKATELL_GATEWAY_MUTATION)
