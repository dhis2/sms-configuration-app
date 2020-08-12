import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'

/**
 * @TODO:
 *   * `messageParameter` & `recipientParameter` do not exist in the api
 *   * "Request method 'PUT' not supported"
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

/**
 * @TODO
 *   * Create jira issue: Make `useDataMutation` accept function for "id"
 */
export const UPDATE_GENERIC_GATEWAY_MUTATION = {
    resource: 'gateways',
    id: '', // replace me dynamically
    type: 'replace',
    data: updateDataFromVariables,
}

export const useUpdateGenericGatewayMutation = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const engine = useDataEngine()

    const doFetch = variables => {
        setLoading(true)
        setError(null)

        const query = {
            ...UPDATE_GENERIC_GATEWAY_MUTATION,
            id: variables.id,
        }

        return engine
            .mutate(query, { variables })
            .then(data => {
                setLoading(false)
                return data
            })
            .catch(error => {
                setLoading(false)
                setError(error)

                throw error
            })
    }

    return [doFetch, { loading, error }]
}
