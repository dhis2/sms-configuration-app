import {
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    string,
    hasValue,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import {
    FIELD_GATEWAY_KEY_VALUE_PAIR_VALUE_LABEL,
    GatewayKeyValuePairValueField,
    createFieldGatewayKeyValuePairValueName,
} from './GatewayKeyValuePairValueField'
import { FormRow, createEqualTo } from '../forms'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

const createEqualToConfidentialValue = index =>
    createEqualTo(
        createFieldGatewayKeyValuePairValueName(index),
        FIELD_GATEWAY_KEY_VALUE_PAIR_VALUE_LABEL
    )

export const FIELD_GATEWAY_KEY_VALUE_PAIR_VALUE_CONFIRMATION_LABEL = i18n.t(
    'Confirm confidential value'
)

export const GatewayKeyValuePairConfidentialValueFields = ({ index }) => {
    return (
        <>
            <FormRow>
                <GatewayKeyValuePairValueField isConfidential index={index} />
            </FormRow>

            <Field
                dataTest={dataTest(
                    'gateways-gatewaykeyvaluepair-valueconfirmation'
                )}
                type="password"
                name={`confirmation[${index}]`}
                label={FIELD_GATEWAY_KEY_VALUE_PAIR_VALUE_CONFIRMATION_LABEL}
                component={InputFieldFF}
                validate={composeValidators(
                    string,
                    hasValue,
                    createEqualToConfidentialValue(index)
                )}
            />
        </>
    )
}

GatewayKeyValuePairConfidentialValueFields.propTypes = {
    index: PropTypes.number.isRequired,
}
