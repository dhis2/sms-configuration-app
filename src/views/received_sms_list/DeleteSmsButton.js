import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import { AlertContext } from '../../notifications'

const mutation = {
    resource: 'sms/inbound',
    id: ({ id }) => id,
    type: 'delete',
}

const DeleteSmsButton = ({ id, onComplete }) => {
    const { addAlert } = useContext(AlertContext)
    const [mutate, { loading, error }] = useDataMutation(mutation, {
        onComplete,
        onError: error => {
            addAlert({ type: 'critical', message: error.message })
        },
        variables: { id },
    })

    return (
        <Button small destructive onClick={mutate} disabled={loading || error}>
            {i18n.t('Delete')}
        </Button>
    )
}

DeleteSmsButton.propTypes = {
    onComplete: PropTypes.func.isRequired,
    id: PropTypes.string,
}

export { DeleteSmsButton }
