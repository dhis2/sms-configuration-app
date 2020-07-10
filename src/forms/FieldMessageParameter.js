import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldMessageParameter = () => (
    <Field
        required
        dataTest={dataTest('forms-fieldmessageparameter')}
        name="messageParameter"
        label={i18n.t('Message parameter')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
