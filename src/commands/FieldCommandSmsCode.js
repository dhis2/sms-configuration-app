import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { PropTypes } from '@dhis2/prop-types'

const { Field } = ReactFinalForm

export const FieldCommandSmsCode = ({ id, displayName, initialValue }) => {
    /**
     * This uses a dynamic, nested name for storing the field value in the
     * form state. You can't submit the data as is though, since the backend
     * expects a different shape. So I was thinking of dealing with that
     * in the submit handler. Since you have the ids and the field value
     * you should be able to transform it into any shape you need.
     */
    return (
        <Field
            required
            name={`smsCodes.${id}`}
            label={displayName}
            component={InputFieldFF}
            initialValue={initialValue}
        />
    )
}

FieldCommandSmsCode.propTypes = {
    displayName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    initialValue: PropTypes.string.isRequired,
}
