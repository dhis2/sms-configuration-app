import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../utils'

const { Field } = ReactFinalForm

export const FIELD_COMMAND_NAME = 'name'

export const FieldCommandName = () => (
    <Field
        required
        dataTest={dataTest('commands-fieldcommandname')}
        name={FIELD_COMMAND_NAME}
        label={i18n.t('Name')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
