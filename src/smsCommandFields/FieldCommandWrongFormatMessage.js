import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME } from './fieldNames'

const { Field } = ReactFinalForm

export const FieldCommandWrongFormatMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandwrongformatmessage')}
        name={FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME}
        label={i18n.t('Wrong format message')}
        component={TextAreaFieldFF}
    />
)
