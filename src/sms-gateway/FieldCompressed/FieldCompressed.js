import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FieldCompressed = () => (
    <Field
        dataTest={dataTest('smsgateway-fieldcompressed')}
        name="compressed"
        type="checkbox"
        label={i18n.t('Compressed')}
        component={CheckboxFieldFF}
        defaultValue={false}
    />
)
