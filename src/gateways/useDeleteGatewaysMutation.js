import { useState } from 'react'
import { useDataEngine } from '@dhis2/app-runtime'

export const DELETE_GATEWAY_MUTATION = {
    resource: 'gateways',
    type: 'delete',
    id: ({ id }) => id,
}

const idToMutationRequestFactory = engine => id => {
    const variables = { id }
    return engine.mutate(DELETE_GATEWAY_MUTATION, { variables })
}

export const useDeleteGatewaysMutation = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const engine = useDataEngine()

    const idToMutationRequest = idToMutationRequestFactory(engine)
    const onStart = () => setLoading(true)
    const onDone = response => {
        setLoading(false)
        return response
    }
    const onError = error => {
        setError(error)
        setLoading(false)
    }

    const mutate = ({ ids }) => {
        onStart()

        return Promise.all(ids.map(idToMutationRequest))
            .then(onDone)
            .catch(onError)
    }

    return [mutate, { loading, error }]
}
