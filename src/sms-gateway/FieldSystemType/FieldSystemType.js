import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../shared'

const { Field } = ReactFinalForm

export const FieldSystemType = () => (
    <Field
        dataTest={dataTest('gateways-fieldgatewaysystemtype')}
        name="systemType"
        label={i18n.t('System type')}
        component={InputFieldFF}
        defaultValue=""
    />
)
