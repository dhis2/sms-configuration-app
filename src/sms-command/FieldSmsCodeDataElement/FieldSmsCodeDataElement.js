import { PropTypes } from '@dhis2/prop-types'
import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../../shared'
import { FIELD_SMS_CODES_NAME } from '../FieldSmsCode'

const { Field } = ReactFinalForm

export const FieldSmsCodeDataElement = ({ dataElement, smsCodes }) => {
    return (
        <Field
            dataTest={dataTest('smscommand-fieldsmscodedataelement')}
            key={dataElement.id}
            name={`${FIELD_SMS_CODES_NAME}.${dataElement.id}`}
            label={dataElement.displayName}
            component={InputFieldFF}
            format={(value) => value?.code || null}
            parse={(code) => {
                const currentValue = smsCodes[dataElement.id]

                const newValue = {
                    ...currentValue,
                    code: code || '',
                    dataElement,
                }

                return newValue
            }}
        />
    )
}

FieldSmsCodeDataElement.propTypes = {
    dataElement: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    smsCodes: PropTypes.objectOf(
        PropTypes.shape({
            dataElement: PropTypes.shape({
                id: PropTypes.string.isRequired,
            }).isRequired,
            code: PropTypes.string,
            compulsory: PropTypes.bool,
            optionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
    ),
}
