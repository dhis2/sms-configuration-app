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

export const FieldRecipientParameter = () => (
    <Field
        required
        dataTest={dataTest('forms-fieldrecipientparameter')}
        name="recipientParameter"
        label={i18n.t('Recipient parameter')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
