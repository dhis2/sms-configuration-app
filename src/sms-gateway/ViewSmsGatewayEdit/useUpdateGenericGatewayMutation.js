import { createGenericGateWayDataFromVariables } from '../createGenericGateWayDataFromVariables/index.js'
import { useUpdateGatewayMutation } from './useUpdateGatewayMutation.js'

export const UPDATE_GENERIC_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'replace',
    data: createGenericGateWayDataFromVariables,
}

export const useUpdateGenericGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_GENERIC_GATEWAY_MUTATION)
