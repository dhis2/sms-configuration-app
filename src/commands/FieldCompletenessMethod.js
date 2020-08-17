import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import * as completenessMethods from './completenessMethods'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm
const options = Object.values(completenessMethods)

export const FieldCompletenessMethod = () => (
    <Field
        required
        dataTest={dataTest('forms-fielddataset')}
        name="completenessMethod"
        label={i18n.t('Completeness method')}
        component={SingleSelectFieldFF}
        options={options}
    />
)
