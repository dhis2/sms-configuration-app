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
    }) => {
        const data = {
            type: 'smpp',
            name,
            systemId,
            host,
            systemType,
            numberPlanIndicator,
            typeOfNumber,
            bindType,
            port,
            compressed,
        }
        if (password) {
            data.password = password
        }
        return data
    },
}

export const useUpdateSMPPGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_SMPP_GATEWAY_MUTATION)
