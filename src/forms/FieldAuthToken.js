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

export const FieldAuthToken = () => (
    <Field
        required
        dataTest={dataTest('forms-fieldauthtoken')}
        name="authtoken"
        label={i18n.t('Auth token')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
