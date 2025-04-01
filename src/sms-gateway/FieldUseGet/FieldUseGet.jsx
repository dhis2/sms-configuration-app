import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldUseGet = () => (
    <Field
        type="checkbox"
        dataTest={dataTest('smsgateway-fielduseget')}
        name="useGet"
        label={i18n.t('Use GET')}
        component={CheckboxFieldFF}
        helpText={i18n.t('Use GET instead of POST to send data to gateway')}
    />
)
