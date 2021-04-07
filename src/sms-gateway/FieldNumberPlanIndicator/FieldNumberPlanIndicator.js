import { SingleSelectFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../shared'

const { Field } = ReactFinalForm

const options = [
    { label: 'UNKNOWN', value: 'UNKNOWN' },
    { label: 'ISDN', value: 'ISDN' },
    { label: 'DATA', value: 'DATA' },
    { label: 'TELEX', value: 'TELEX' },
    { label: 'LAND_MOBILE', value: 'LAND_MOBILE' },
    { label: 'NATIONAL', value: 'NATIONAL' },
    { label: 'PRIVATE', value: 'PRIVATE' },
    { label: 'ERMES', value: 'ERMES' },
    { label: 'INTERNET', value: 'INTERNET' },
    { label: 'WAP', value: 'WAP' },
]

export const FieldNumberPlanIndicator = () => (
    <Field
        required
        dataTest={dataTest('gateways-fieldgatewaynumberplanindicator')}
        name="numberPlanIndicator"
        label={i18n.t('Number plan indicator')}
        component={SingleSelectFieldFF}
        options={options}
        defaultValue={options[0]}
    />
)
