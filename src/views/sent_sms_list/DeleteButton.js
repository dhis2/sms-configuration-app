import React, { useState, useContext } from 'react'
import { Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '../../locales'
import RefetchSms from './RefetchSms'

const DeleteButton = ({ id }) => {
    const refetch = useContext(RefetchSms)
    const [loading, setLoading] = useState(false)

    /**
     * FIXME: Using the data engine directly since the data mutation doesn't seem to
     * support this pattern. It is an uncommon pattern, so using the engine directly
     * seems like the best solution.
     */
    const engine = useDataEngine()
    const mutation = {
        resource: 'sms/outbound/message',
        type: 'delete',
        params: {
            // We get the ids as numbers from the backend
            ids: id.toString(),
        },
    }

    const onClick = () => {
        setLoading(true)
        engine
            .mutate(mutation)
            .then(() => {
                setLoading(false)
                refetch()
            })
            .catch(() => {
                setLoading(false)
                console.log('should handle error')
            })
    }

    /**
     * We're disabling the button when fetching instead of rendering a spinner, since rendering
     * a spinner results in the whole table jumping and for a short fetch that looks very buggy
     */
    return (
        <Button small destructive onClick={onClick} disabled={loading}>
            {i18n.t('Delete')}
        </Button>
    )
}

DeleteButton.propTypes = {
    id: PropTypes.number.isRequired,
}

export default DeleteButton
