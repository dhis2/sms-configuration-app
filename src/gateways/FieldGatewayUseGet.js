import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldGatewayUseGet = () => (
    <Field
        type="checkbox"
        dataTest={dataTest('gateways-fieldgatewayuseget')}
        name="useGet"
        label={i18n.t('Use GET')}
        component={CheckboxFieldFF}
        helpText={i18n.t('Use GET instead of POST to send data to gateway')}
    />
)
