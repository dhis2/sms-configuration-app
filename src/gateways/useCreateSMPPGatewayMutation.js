import { useDataMutation } from '@dhis2/app-runtime'

export const CREATE_SMPP_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: ({
        name,
        systemId,
        host,
        systemType,
        numberPlanIndicator,
        typeOfNumber,
        bindType,
        port,
        password,
        compressed,
    }) => ({
        type: 'smpp',
        name,
        systemId,
        host,
        systemType,
        numberPlanIndicator,
        typeOfNumber,
        bindType,
        port,
        password,
        compressed,
    }),
}

export const useCreateSMPPGatewayMutation = () =>
    useDataMutation(CREATE_SMPP_GATEWAY_MUTATION)
