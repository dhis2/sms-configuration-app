import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../shared'

const { Field } = ReactFinalForm

export const FieldCompressed = () => (
    <Field
        dataTest={dataTest('gateways-fieldgatewaycompressed')}
        name="compressed"
        type="checkbox"
        label={i18n.t('Compressed')}
        component={CheckboxFieldFF}
        defaultValue={false}
    />
)
