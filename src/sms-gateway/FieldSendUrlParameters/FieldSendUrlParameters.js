import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldSendUrlParameters = () => (
    <Field
        type="checkbox"
        dataTest={dataTest('smsgateway-fieldsendurlparameters')}
        name="sendUrlParameters"
        label={i18n.t('Send url parameters')}
        component={CheckboxFieldFF}
    />
)
