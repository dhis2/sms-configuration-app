import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldGatewayCompressed = () => (
    <Field
        dataTest={dataTest('gateways-fieldgatewaycompressed')}
        name="compressed"
        type="checkbox"
        label={i18n.t('Compressed')}
        component={CheckboxFieldFF}
        defaultValue={false}
    />
)
