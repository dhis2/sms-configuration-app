import React from 'react'
import { Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '../../locales'

const DeleteSelectedButton = ({ disabled, onClick }) => {
    return (
        <Button small destructive disabled={disabled} onClick={onClick}>
            {i18n.t('Delete selected sms')}
        </Button>
    )
}

DeleteSelectedButton.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default DeleteSelectedButton
