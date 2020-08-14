import { useDataMutation } from '@dhis2/app-runtime'

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
const createDataFromVariables = ({ name, urlTemplate, parameters }) => ({
    type: 'http',
    name,
    urlTemplate,
    parameters,
})

export const CREATE_GENERIC_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'create',
    data: createDataFromVariables,
}

export const useCreateGenericGatewayMutation = () =>
    useDataMutation(CREATE_GENERIC_GATEWAY_MUTATION)
