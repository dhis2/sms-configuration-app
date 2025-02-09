import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    url,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldUrlTemplate = () => (
    <Field
        required
        dataTest={dataTest('smsgateway-fieldurltemplate')}
        name="urlTemplate"
        label={i18n.t('Url template')}
        component={InputFieldFF}
        validate={composeValidators(url, hasValue)}
    />
)
