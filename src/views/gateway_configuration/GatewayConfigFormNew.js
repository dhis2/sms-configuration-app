import { SingleSelectField, SingleSelectOption, NoticeBox } from '@dhis2/ui'
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
import i18n from '../../locales'
import styles from './GatewayConfigFormNew.module.css'

export const GATEWAY_CONFIG_FORM_NEW_PATH = '/sms-gateway/new'

export const GatewayConfigFormNew = () => {
    const history = useHistory()
    const [visibleForm, setVisibleForm] = useState(GENERIC_FORM)

    const [
        saveGenericGateway,
        { error: saveGenericGatewayError },
    ] = useCreateGenericGatewayMutation()

    const [
        saveBulkSMSGateway,
        { error: saveBulkSMSGatewayError },
    ] = useCreateBulkSMSGatewayMutation()

    const [
        saveClickatellGateway,
        { error: saveClickatellGatewayError },
    ] = useCreateClickatellGatewayMutation()

    const error =
        saveGenericGatewayError ||
        saveBulkSMSGatewayError ||
        saveClickatellGatewayError

    if (error) {
        const msg = i18n.t('Something went wrong whilst saving the gateway')

        return (
            <div data-test={dataTest('views-gatewayconfigformnew')}>
                <PageHeadline>{i18n.t('Add gateway')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </div>
        )
    }

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

    const onCancelClick = () => history.push(GATEWAY_CONFIG_LIST_PATH)

    return (
        <div
            data-test={dataTest('views-gatewayconfigformnew')}
            className={styles.container}
        >
            <PageHeadline>{i18n.t('Add gateway')}</PageHeadline>

            <FormRow>
                <SingleSelectField
                    label={i18n.t('Type')}
                    onChange={({ selected }) => setVisibleForm(selected)}
                    selected={visibleForm}
                    dataTest={dataTest(
                        'views-gatewayconfigformnew-gatewaytype'
                    )}
                >
                    <SingleSelectOption
                        value={GENERIC_FORM}
                        label={i18n.t('Generic')}
                    />

                    <SingleSelectOption
                        value={BULK_SMS_FORM}
                        label={i18n.t('BulkSMS')}
                    />

                    <SingleSelectOption
                        value={CLICKATELL_FORM}
                        label={i18n.t('Clickatell')}
                    />
                </SingleSelectField>
            </FormRow>

            <FormRow>
                {visibleForm === GENERIC_FORM && (
                    <GatewayGenericForm
                        onSubmit={onSubmit}
                        onCancelClick={onCancelClick}
                    />
                )}

                {visibleForm === BULK_SMS_FORM && (
                    <GatewayBulkSMSForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}

                {visibleForm === CLICKATELL_FORM && (
                    <GatewayClickatellForm
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}
            </FormRow>
        </div>
    )
}
