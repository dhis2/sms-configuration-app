import { ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { GatewayKeyValuePairValueField } from './GatewayKeyValuePairValueField'
import { GatewayKeyValuePairConfidentialValueFields } from './GatewayKeyValuePairConfidentialValueFields'

const { useField } = ReactFinalForm

export const GatewayKeyValuePairValue = ({ index }) => {
    const { input } = useField(`parameters[${index}]`)
    const { confidential } = input.value

    if (confidential) {
        return <GatewayKeyValuePairConfidentialValueFields index={index} />
    }

    return <GatewayKeyValuePairValueField index={index} />
}

GatewayKeyValuePairValue.propTypes = {
    index: PropTypes.number.isRequired,
}
