import React, { useContext } from 'react'
import { Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { useDataMutation } from '@dhis2/app-runtime'
import i18n from '../../locales'
import { AlertContext } from '../../notifications'
import RefetchSms from './RefetchSms'

const mutation = {
    resource: 'sms/outbound',
    params: ({ ids }) => ({ ids }),
    type: 'delete',
}

const DeleteSelectedButton = ({ selected }) => {
    const disabled = selected.length === 0
    const ids = selected.join(',')

    const { addAlert } = useContext(AlertContext)
    const { refetchAndClear } = useContext(RefetchSms)
    const [mutate, { loading }] = useDataMutation(mutation, {
        onComplete: () => {
            refetchAndClear()
        },
        onError: error => {
            addAlert({ type: 'critical', message: error.message })
        },
    })

    return (
        <Button
            small
            destructive
            disabled={disabled || loading}
            onClick={() => mutate({ ids })}
        >
            {i18n.t('Delete selected SMSes')}
        </Button>
    )
}

DeleteSelectedButton.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DeleteSelectedButton
