import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import { Button } from '@dhis2/ui'
import React, { useContext } from 'react'
import { AlertContext } from '../notifications'

const inboundMutation = {
    resource: 'sms/inbound',
    type: 'delete',
    params: ({ ids }) => ({ ids }),
}

const outboundMutation = {
    resource: 'sms/outbound',
    type: 'delete',
    params: ({ ids }) => ({ ids }),
}

export const DeleteSelectedButton = ({ selectedIds, type, onComplete }) => {
    const { addAlert } = useContext(AlertContext)
    const mutation = type == 'inbound' ? inboundMutation : outboundMutation
    const [mutate] = useDataMutation(mutation, {
        onComplete,
        onError: error => {
            addAlert({ type: 'critical', message: error.message })
        },
    })

    return (
        <Button
            destructive
            onClick={() => mutate({ ids: selectedIds.join() })}
            disabled={selectedIds.length === 0}
        >
            {i18n.t('Delete selected')}
        </Button>
    )
}

DeleteSelectedButton.propTypes = {
    selectedIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    type: PropTypes.oneOf(['inbound', 'outbound']).isRequired,
    onComplete: PropTypes.func.isRequired,
}
