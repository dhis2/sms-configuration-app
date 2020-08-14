import { useDataMutation } from '@dhis2/app-runtime'

export const CREATE_CLICKATELL_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: ({ name, username, authtoken, urlTemplate }) => ({
        type: 'clickatell',
        name,
        username,
        authtoken,
        urlTemplate,
    }),
}

export const useCreateClickatellGatewayMutation = () =>
    useDataMutation(CREATE_CLICKATELL_GATEWAY_MUTATION)
