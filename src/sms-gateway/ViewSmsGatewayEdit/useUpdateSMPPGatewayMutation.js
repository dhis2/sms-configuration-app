import { useUpdateGatewayMutation } from './useUpdateGatewayMutation.js'

export const UPDATE_SMPP_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'update',
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

export const useUpdateSMPPGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_SMPP_GATEWAY_MUTATION)
