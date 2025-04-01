import { InputFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldSystemType = () => (
    <Field
        dataTest={dataTest('smsgateway-fieldsystemtype')}
        name="systemType"
        label={i18n.t('System type')}
        component={InputFieldFF}
        defaultValue=""
    />
)
