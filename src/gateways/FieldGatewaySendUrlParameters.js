import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldGatewaySendUrlParameters = () => (
    <Field
        type="checkbox"
        dataTest={dataTest('gateways-fieldgatewaysendurlparameters')}
        name="sendUrlParameters"
        label={i18n.t('Send url parameters')}
        component={CheckboxFieldFF}
    />
)
