import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import { GATEWAY_CONFIG_LIST_PATH } from './GatewayConfigList'
import { GENERIC_FORM, BULK_SMS_FORM, CLICKATELL_FORM } from '../../gateways'
import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import {
    GatewayBulkSMSForm,
    GatewayClickatellForm,
    GatewayGenericForm,
    useCreateBulkSMSGatewayMutation,
    useCreateClickatellGatewayMutation,
    useCreateGenericGatewayMutation,
} from '../../gateways'
import { useCriticalNotification } from '../../notifications'
import i18n from '../../locales'

export const GATEWAY_CONFIG_FORM_NEW_PATH = '/sms-gateway/new'

export const GatewayConfigFormNew = () => {
    const history = useHistory()
    const [visibleForm, setVisibleForm] = useState(GENERIC_FORM)

    const [
        saveGenericGateway,
        { error: saveGenericGatewayError },
    ] = useCreateGenericGatewayMutation()
    useCriticalNotification(saveGenericGatewayError)

    const [
        saveBulkSMSGateway,
        { error: saveBulkSMSGatewayError },
    ] = useCreateBulkSMSGatewayMutation()
    useCriticalNotification(saveBulkSMSGatewayError)

    const [
        saveClickatellGateway,
        { error: saveClickatellGatewayError },
    ] = useCreateClickatellGatewayMutation()
    useCriticalNotification(saveClickatellGatewayError)

    const onSubmit = async values => {
        try {
            if (visibleForm === GENERIC_FORM) {
                await saveGenericGateway(values)
            }

            if (visibleForm === BULK_SMS_FORM) {
                await saveBulkSMSGateway(values)
            }

            if (visibleForm === CLICKATELL_FORM) {
                await saveClickatellGateway(values)
            }

            history.push(GATEWAY_CONFIG_LIST_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    return (
        <div data-test={dataTest('views-gatewayconfigformnew')}>
            <PageHeadline>SMS Gateway Configuration</PageHeadline>

            <FormRow>
                <SingleSelectField
                    label={i18n.t('Gateway type')}
                    onChange={({ selected }) => setVisibleForm(selected)}
                    selected={visibleForm}
                    dataTest={dataTest(
                        'views-gatewayconfigformnew-gatewaytype'
                    )}
                >
                    <SingleSelectOption
                        value={GENERIC_FORM}
                        label={i18n.t('Generic form')}
                    />

                    <SingleSelectOption
                        value={BULK_SMS_FORM}
                        label={i18n.t('BulkSMS form')}
                    />

                    <SingleSelectOption
                        value={CLICKATELL_FORM}
                        label={i18n.t('Clickatell form')}
                    />
                </SingleSelectField>
            </FormRow>

            <FormRow>
                {visibleForm === GENERIC_FORM && (
                    <GatewayGenericForm onSubmit={onSubmit} />
                )}

                {visibleForm === BULK_SMS_FORM && (
                    <GatewayBulkSMSForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                    />
                )}

                {visibleForm === CLICKATELL_FORM && (
                    <GatewayClickatellForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                    />
                )}
            </FormRow>
        </div>
    )
}
