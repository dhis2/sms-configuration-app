import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

const options = [
    { label: 'BIND_TX', value: 'BIND_TX' },
    { label: 'BIND_RX', value: 'BIND_RX' },
    { label: 'BIND_TRX', value: 'BIND_TRX' },
]

export const FieldBindType = () => (
    <Field
        required
        dataTest={dataTest('smsgateway-fieldbindtype')}
        name="bindType"
        label={i18n.t('Bind type')}
        component={SingleSelectFieldFF}
        options={options}
        defaultValue={options[0]}
    />
)
