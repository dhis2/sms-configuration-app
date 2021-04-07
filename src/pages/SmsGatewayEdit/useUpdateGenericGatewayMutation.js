import { createGenericGateWayDataFromVariables } from '../../sms-gateway'
import { useUpdateGatewayMutation } from './useUpdateGatewayMutation'

export const UPDATE_GENERIC_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'replace',
    data: createGenericGateWayDataFromVariables,
}

export const useUpdateGenericGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_GENERIC_GATEWAY_MUTATION)
