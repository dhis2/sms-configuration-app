import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../shared'

const { Field } = ReactFinalForm

export const FieldSendUrlParameters = () => (
    <Field
        type="checkbox"
        dataTest={dataTest('gateways-fieldgatewaysendurlparameters')}
        name="sendUrlParameters"
        label={i18n.t('Send url parameters')}
        component={CheckboxFieldFF}
    />
)
