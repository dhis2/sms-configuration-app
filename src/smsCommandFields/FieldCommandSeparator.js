import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { FIELD_COMMAND_SEPARATOR_NAME } from './fieldNames'

const { Field } = ReactFinalForm

export const FieldCommandSeparator = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandseparator')}
        name={FIELD_COMMAND_SEPARATOR_NAME}
        label={i18n.t('Field separator')}
        component={InputFieldFF}
    />
)
