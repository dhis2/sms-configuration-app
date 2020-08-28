import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import { FIELD_COMMAND_COMPLETENESS_METHOD_NAME } from './fieldNames'
import * as completenessMethods from './completenessMethods'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm
const options = Object.values(completenessMethods)

export const FieldCommandCompletenessMethod = () => (
    <Field
        dataTest={dataTest('forms-fielddataset')}
        name={FIELD_COMMAND_COMPLETENESS_METHOD_NAME}
        label={i18n.t('Completeness method')}
        component={SingleSelectFieldFF}
        options={options}
    />
)
