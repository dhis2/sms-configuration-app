import i18n from '@dhis2/d2-i18n'
import { Checkbox } from '@dhis2/ui'
import PropTypes from 'prop-types'
import React from 'react'

export const FieldEditConfidential = ({
    editMode,
    allowConfidentialFieldEdit,
    setAllowConfidentialFieldEdit,
    fieldType,
}) => {
    if (!editMode) {
        return null
    }

    return (
        <Checkbox
            label={i18n.t('Edit {{fieldType}}', { fieldType })}
            checked={allowConfidentialFieldEdit}
            onChange={() => setAllowConfidentialFieldEdit((prev) => !prev)}
        />
    )
}

FieldEditConfidential.propTypes = {
    allowConfidentialFieldEdit: PropTypes.bool.isRequired,
    editMode: PropTypes.bool.isRequired,
    setAllowConfidentialFieldEdit: PropTypes.func.isRequired,
    fieldType: PropTypes.string,
}
