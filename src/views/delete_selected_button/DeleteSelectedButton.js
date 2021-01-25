import React, { useContext, useMemo } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { useDataMutation } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import { AlertContext } from '../../notifications'

const DeleteSelectedButton = ({
    selectedIds,
    mutationResource,
    onComplete,
}) => {
    const { addAlert } = useContext(AlertContext)
    const mutation = useMemo(
        () => ({
            resource: mutationResource,
            type: 'delete',
            params: ({ ids }) => ({ ids }),
        }),
        [mutationResource]
    )
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
    mutationResource: PropTypes.string.isRequired,
    selectedIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onComplete: PropTypes.func.isRequired,
}

export default DeleteSelectedButton
