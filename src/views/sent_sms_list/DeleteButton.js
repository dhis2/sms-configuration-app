import React from 'react'
import { Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '../../locales'

const DeleteButton = ({ id }) => {
    const onClick = () => {
        console.log(`Delete message ${id}`)
    }

    return (
        <Button small destructive onClick={onClick}>
            {i18n.t('Delete')}
        </Button>
    )
}

DeleteButton.propTypes = {
    id: PropTypes.string.isRequired,
}

export default DeleteButton
