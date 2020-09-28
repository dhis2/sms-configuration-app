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
 * @param {string} args.configurationTemplate
 * @param {string} args.contentType
 * @param {string} args.name
 * @param {string} args.urlTemplate
 * @param {bool} args.sendUrlParameters
 * @param {bool} args.useGet
 * @param {Parameter[]} args.parameters
 *
 * @returns {Object}
 */
export const createGenericGateWayDataFromVariables = ({
    configurationTemplate,
    contentType,
    name,
    parameters,
    sendUrlParameters,
    urlTemplate,
    useGet,
}) => ({
    type: 'http',
    configurationTemplate,
    contentType,
    name,
    parameters,
    sendUrlParameters,
    urlTemplate,
    useGet,
})
