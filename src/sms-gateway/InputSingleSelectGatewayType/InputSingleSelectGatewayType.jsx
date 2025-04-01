import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { PropTypes } from 'prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import { gatewayTypes } from './gatewayTypes.js'

const { GENERIC_FORM, BULK_SMS_FORM, CLICKATELL_FORM, SMPP_FORM } = gatewayTypes

export const InputSingleSelectGatewayType = ({ onChange, selected }) => (
    <SingleSelectField
        label={i18n.t('Type')}
        onChange={onChange}
        selected={selected}
        dataTest={dataTest('smsgateway-viewsmsgatewayadd-gatewaytype')}
    >
        <SingleSelectOption value={GENERIC_FORM} label={i18n.t('Generic')} />
        <SingleSelectOption value={BULK_SMS_FORM} label={i18n.t('BulkSMS')} />
        <SingleSelectOption
            value={CLICKATELL_FORM}
            label={i18n.t('Clickatell')}
        />
        <SingleSelectOption value={SMPP_FORM} label={i18n.t('SMPP')} />
    </SingleSelectField>
)

InputSingleSelectGatewayType.propTypes = {
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}
