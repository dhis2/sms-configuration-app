import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldGatewaySystemType = () => (
    <Field
        dataTest={dataTest('gateways-fieldgatewaysystemtype')}
        name="systemType"
        label={i18n.t('System type')}
        component={InputFieldFF}
        defaultValue=""
    />
)
