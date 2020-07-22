import { useDataMutation } from '@dhis2/app-runtime'

/**
 * @TODO(request params):
 *   `messageParameter` & `recipientParameter` do not exist in the api
 */

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
 * @param {string} args.messageParameter
 * @param {string} args.recipientParameter
 * @param {string} args.urlTemplate
 * @param {Parameter[]} args.parameters
 *
 * @returns {Object}
 */
const updateDataFromVariables = ({
    name,
    messageParameter,
    recipientParameter,
    urlTemplate,
    parameters,
}) => ({
    type: 'http',
    name,
    messageParameter,
    recipientParameter,
    urlTemplate,
    parameters,
})

export const UPDATE_GENERIC_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'replace',
    data: updateDataFromVariables,
}

export const useUpdateGenericGatewayMutation = () =>
    useDataMutation(UPDATE_GENERIC_GATEWAY_MUTATION)
