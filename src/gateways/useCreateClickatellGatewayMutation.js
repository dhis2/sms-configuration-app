import { useDataMutation } from '@dhis2/app-runtime'

const SAVE_CLICKATELL_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: {
        type: 'clickatell',
        name: ({ name }) => name,
        username: ({ username }) => username,
        authtoken: ({ authtoken }) => authtoken,
        urlTemplate: ({ urlTemplate }) => urlTemplate,
    },
}

export const useCreateClickatellGatewayMutation = () =>
    useDataMutation(SAVE_CLICKATELL_GATEWAY_MUTATION)
