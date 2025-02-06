import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    integer,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldPort = () => (
    <Field
        required
        dataTest={dataTest('smsgateway-fieldport')}
        name="port"
        label={i18n.t('Port')}
        component={InputFieldFF}
        validate={composeValidators(integer, hasValue)}
    />
)
