import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_SEPARATOR_NAME = 'separator'

export const FieldSeparator = () => (
    <Field
        dataTest={dataTest('smscommand-fieldseparator')}
        name={FIELD_SEPARATOR_NAME}
        label={i18n.t('Field separator')}
        component={InputFieldFF}
    />
)
