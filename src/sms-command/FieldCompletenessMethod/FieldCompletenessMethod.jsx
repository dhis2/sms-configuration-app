import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/utils/index.js'
import { completenessMethods } from './completenessMethods.js'

const { Field } = ReactFinalForm
const options = Object.values(completenessMethods)

export const FIELD_COMPLETENESS_METHOD_NAME = 'completenessMethod'

export const FieldCompletenessMethod = () => (
    <Field
        dataTest={dataTest('smscommand-fieldcompletenessmethod')}
        name={FIELD_COMPLETENESS_METHOD_NAME}
        label={i18n.t('Completeness method')}
        component={SingleSelectFieldFF}
        options={options}
    />
)
