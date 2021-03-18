import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    integer,
} from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'

const { Field } = ReactFinalForm

export const FieldGatewayPort = () => (
    <Field
        required
        dataTest={dataTest('gateways-fieldgatewayport')}
        name="port"
        label={i18n.t('Port')}
        component={InputFieldFF}
        validate={composeValidators(integer, hasValue)}
    />
)
