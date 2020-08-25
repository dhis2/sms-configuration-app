import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import { AlertContext } from '../../notifications'

const mutation = {
    resource: 'sms/inbound',
    type: 'delete',
    params: ({ ids }) => ({ ids }),
}

const DeleteSelectedButton = ({ selectedIds, onComplete }) => {
    const { addAlert } = useContext(AlertContext)
    const [mutate] = useDataMutation(mutation, {
        onComplete,
        onError: error => {
            addAlert({ type: 'critical', message: error.message })
        },
    })

    return (
        <Button
            large
            destructive
            onClick={() => mutate({ ids: selectedIds.join() })}
            disabled={selectedIds.length === 0}
        >
            {i18n.t('Delete checked messages')}
        </Button>
    )
}

DeleteSelectedButton.propTypes = {
    onComplete: PropTypes.func.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string),
}

export { DeleteSelectedButton }
