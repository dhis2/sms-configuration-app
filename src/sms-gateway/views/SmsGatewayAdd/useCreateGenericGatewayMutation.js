import { useDataMutation } from '@dhis2/app-runtime'
import { createGenericGateWayDataFromVariables } from '../../utils'

export const CREATE_GENERIC_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: createGenericGateWayDataFromVariables,
}

export const useCreateGenericGatewayMutation = () =>
    useDataMutation(CREATE_GENERIC_GATEWAY_MUTATION)
