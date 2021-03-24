import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../utils'

const { Field } = ReactFinalForm

export const FIELD_SEPARATOR_NAME = 'separator'

export const FieldSeparator = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandseparator')}
        name={FIELD_SEPARATOR_NAME}
        label={i18n.t('Field separator')}
        component={InputFieldFF}
    />
)
