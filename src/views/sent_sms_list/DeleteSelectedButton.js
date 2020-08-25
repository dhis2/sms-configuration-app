import React, { useContext, useState } from 'react'
import { Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import i18n from '../../locales'
import { AlertContext } from '../../notifications'
import RefetchSms from './RefetchSms'

const DeleteSelectedButton = ({ selected }) => {
    const { addAlert } = useContext(AlertContext)
    const { refetchAndClear } = useContext(RefetchSms)
    const [loading, setLoading] = useState(false)
    const disabled = selected.length === 0
    const ids = selected.join(',')

    /**
     * FIXME: Using the data engine directly since the data mutation doesn't seem to
     * support this pattern. It is an uncommon pattern, so using the engine directly
     * seems like the best solution.
     */
    const engine = useDataEngine()
    const mutation = {
        resource: 'sms/outbound',
        type: 'delete',
        params: {
            ids,
        },
    }

    const onClick = () => {
        setLoading(true)
        engine
            .mutate(mutation)
            .then(() => {
                setLoading(false)
                refetchAndClear()
            })
            .catch(error => {
                setLoading(false)
                addAlert({ type: 'critical', message: error.message })
            })
    }

    return (
        <Button
            small
            destructive
            disabled={disabled || loading}
            onClick={onClick}
        >
            {i18n.t('Delete selected SMSes')}
        </Button>
    )
}

DeleteSelectedButton.propTypes = {
    selected: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default DeleteSelectedButton
