import { SingleSelectField, SingleSelectOption, NoticeBox } from '@dhis2/ui'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import i18n from '../../../locales'
import { FormRow, PageHeadline } from '../../../shared/components'
import { dataTest } from '../../../shared/utils'
import {
    FormBulkSMS,
    FormClickatell,
    FormGeneric,
    FormSMPP,
} from '../../components'
import {
    GENERIC_FORM,
    BULK_SMS_FORM,
    CLICKATELL_FORM,
    SMPP_FORM,
} from '../../utils'
import styles from './SmsGatewayAdd.module.css'
import { useCreateBulkSMSGatewayMutation } from './useCreateBulkSMSGatewayMutation'
import { useCreateClickatellGatewayMutation } from './useCreateClickatellGatewayMutation'
import { useCreateGenericGatewayMutation } from './useCreateGenericGatewayMutation'
import { useCreateSMPPGatewayMutation } from './useCreateSMPPGatewayMutation'

export const GATEWAY_CONFIG_FORM_NEW_PATH = '/sms-gateway/new'

export const SmsGatewayAdd = () => {
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

    const [
        saveSMPPGateway,
        { error: saveSMPPGatewayError },
    ] = useCreateSMPPGatewayMutation()

    const error =
        saveGenericGatewayError ||
        saveBulkSMSGatewayError ||
        saveClickatellGatewayError ||
        saveSMPPGatewayError

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

            if (visibleForm === SMPP_FORM) {
                await saveSMPPGateway(values)
            }

            history.push('/sms-gateway')
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const onCancelClick = () => history.push('/sms-gateway')

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

                    <SingleSelectOption
                        value={SMPP_FORM}
                        label={i18n.t('SMPP')}
                    />
                </SingleSelectField>
            </FormRow>

            <FormRow>
                {visibleForm === GENERIC_FORM && (
                    <FormGeneric
                        onSubmit={onSubmit}
                        onCancelClick={onCancelClick}
                    />
                )}

                {visibleForm === BULK_SMS_FORM && (
                    <FormBulkSMS
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}

                {visibleForm === CLICKATELL_FORM && (
                    <FormClickatell
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}

                {visibleForm === SMPP_FORM && (
                    <FormSMPP
                        onSubmit={onSubmit}
                        passwordRequired={true}
                        onCancelClick={onCancelClick}
                    />
                )}
            </FormRow>
        </div>
    )
}
