import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'

/**
 * @TODO
 *   * Create jira issue: Make `useDataMutation` accept function for "id"
 */

/**
 * @param {Object} query
 * @returns {Object}
 */
export const useUpdateGatewayMutation = query => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const engine = useDataEngine()

    const doFetch = variables => {
        const updatedQuery = { ...query, id: variables.id }

        setLoading(true)
        setError(null)

        return engine
            .mutate(updatedQuery, { variables })
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
