import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

const { Field } = ReactFinalForm

export const FieldCommandSmsCode = ({ displayName, initialValue }) => {
    return (
        <Field
            required
            name={displayName}
            label={displayName}
            component={InputFieldFF}
            initialValue={initialValue}
        />
    )
}

FieldCommandSmsCode.propTypes = {
    displayName: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
}
