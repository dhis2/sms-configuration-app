import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import * as completenessMethods from './completenessMethods'
import { FIELD_COMMAND_COMPLETENESS_METHOD_NAME } from './fieldNames'

const { Field } = ReactFinalForm
const options = Object.values(completenessMethods)

export const FieldCommandCompletenessMethod = () => (
    <Field
        dataTest={dataTest('smscommandfields-fieldcommandcompletenessmethod')}
        name={FIELD_COMMAND_COMPLETENESS_METHOD_NAME}
        label={i18n.t('Completeness method')}
        component={SingleSelectFieldFF}
        options={options}
    />
)
