import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FIELD_COMMAND_SMS_CODES_NAME } from './fieldNames'

const { Field, useFormState } = ReactFinalForm
const subscription = {
    values: true,
}

export const FieldCommandSmsCode = ({ id, displayName, valueType }) => {
    const { values } = useFormState({ subscription })
    const smsCode = values[FIELD_COMMAND_SMS_CODES_NAME][id]

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
            name={`${FIELD_COMMAND_SMS_CODES_NAME}.${id}`}
            label={displayName}
            component={InputFieldFF}
            format={code => code?.code || ''}
            parse={nextCode =>
                !smsCode
                    ? {
                          code: nextCode,
                          trackedEntityAttribute: {
                              id,
                              displayName,
                              valueType,
                          },
                      }
                    : {
                          ...smsCode,
                          code: nextCode,
                      }
            }
        />
    )
}

FieldCommandSmsCode.propTypes = {
    displayName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    valueType: PropTypes.string.isRequired,
}
