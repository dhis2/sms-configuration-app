import i18n from '@dhis2/d2-i18n'
import { Checkbox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const FieldEditPassword = ({
    editMode,
    allowPasswordEdit,
    setAllowPasswordEdit,
    authTokenType,
}) => {
    if (!editMode) {
        return null
    }

    return (
        <Checkbox
            label={
                authTokenType
                    ? i18n.t('Edit auth token')
                    : i18n.t('Edit password')
            }
            checked={allowPasswordEdit}
            onChange={() => setAllowPasswordEdit((prev) => !prev)}
        />
    )
}

FieldEditPassword.propTypes = {
    allowPasswordEdit: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    setAllowPasswordEdit: PropTypes.func.isRequired,
    authTokenType: PropTypes.bool,
}
