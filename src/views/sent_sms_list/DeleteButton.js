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

const DeleteButton = ({ id, cleanSelected }) => {
    const { addAlert } = useContext(AlertContext)
    const { refetch } = useContext(RefetchSms)
    const [mutate, { loading }] = useDataMutation(mutation, {
        onComplete: () => {
            cleanSelected(id)
            refetch()
        },
        onError: error => {
            addAlert({ type: 'critical', message: error.message })
        },
        variables: {
            ids: id,
        },
    })

    /**
     * We're disabling the button when fetching instead of rendering a spinner, since rendering
     * a spinner results in the whole table jumping and for a short fetch that looks very buggy
     */
    return (
        <Button small destructive onClick={mutate} disabled={loading}>
            {i18n.t('Delete')}
        </Button>
    )
}

DeleteButton.propTypes = {
    cleanSelected: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}

export default DeleteButton
