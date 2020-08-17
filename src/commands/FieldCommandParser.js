import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import * as commandTypes from './types'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm
const options = Object.values(commandTypes)

export const FieldCommandParser = () => (
    <Field
        required
        dataTest={dataTest('forms-fieldcommandparser')}
        name="parserType"
        label={i18n.t('Parser')}
        component={SingleSelectFieldFF}
        options={options}
    />
)
