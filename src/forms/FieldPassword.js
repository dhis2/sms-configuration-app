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

export const FieldPassword = () => (
    <Field
        required
        dataTest={dataTest('forms-fieldpassword')}
        name="password"
        label={i18n.t('Password')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
