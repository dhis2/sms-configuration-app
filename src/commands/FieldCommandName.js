import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'

import { FIELD_COMMAND_NAME_NAME } from './fieldNames'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldCommandName = () => (
    <Field
        required
        dataTest={dataTest('commands-fieldcommandname')}
        name={FIELD_COMMAND_NAME_NAME}
        label={i18n.t('Name')}
        component={InputFieldFF}
        validate={composeValidators(string, hasValue)}
    />
)
