import { useUpdateGatewayMutation } from './useUpdateGatewayMutation'

/**
 * This the shape of the additional fields
 * that can be added to a generic config
 *
 * @typedef {Object} Parameter
 * @prop {string} key
 * @prop {string} value
 * @prop {bool} header
 * @prop {bool} encode
 * @prop {bool} confidential
 */

/**
 * @param {Object} args
 * @param {string} args.name
 * @param {string} args.urlTemplate
 * @param {Parameter[]} args.parameters
 *
 * @returns {Object}
 */
const updateDataFromVariables = ({ name, urlTemplate, parameters }) => ({
    type: 'http',
    name,
    urlTemplate,
    parameters,
})

export const UPDATE_GENERIC_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: ({ id }) => id,
    type: 'replace',
    data: updateDataFromVariables,
}

export const useUpdateGenericGatewayMutation = () =>
    useUpdateGatewayMutation(UPDATE_GENERIC_GATEWAY_MUTATION)
