import { SingleSelectField, SingleSelectOption, NoticeBox } from '@dhis2/ui'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import i18n from '../../locales/index.js'
import {
    FormRow,
    PageHeadline,
    TemplateSidebarNavContent,
    dataTest,
} from '../../shared/index.js'
import { FormBulkSMS } from '../FormBulkSMS/index.js'
import { FormClickatell } from '../FormClickatell/index.js'
import { FormGeneric } from '../FormGeneric/index.js'
import { FormSMPP } from '../FormSMPP/index.js'
import { gatewayTypes } from '../InputSingleSelectGatewayType/index.js'
import { useCreateBulkSMSGatewayMutation } from './useCreateBulkSMSGatewayMutation.js'
import { useCreateClickatellGatewayMutation } from './useCreateClickatellGatewayMutation.js'
import { useCreateGenericGatewayMutation } from './useCreateGenericGatewayMutation.js'
import { useCreateSMPPGatewayMutation } from './useCreateSMPPGatewayMutation.js'
import styles from './ViewSmsGatewayAdd.module.css'

const { GENERIC_FORM, BULK_SMS_FORM, CLICKATELL_FORM, SMPP_FORM } = gatewayTypes

export const GATEWAY_CONFIG_FORM_NEW_PATH = '/sms-gateway/new'

export const ViewSmsGatewayAdd = () => {
    const history = useHistory()
    const [visibleForm, setVisibleForm] = useState(GENERIC_FORM)

    const [saveGenericGateway, { error: saveGenericGatewayError }] =
        useCreateGenericGatewayMutation()

    const [saveBulkSMSGateway, { error: saveBulkSMSGatewayError }] =
        useCreateBulkSMSGatewayMutation()

    const [saveClickatellGateway, { error: saveClickatellGatewayError }] =
        useCreateClickatellGatewayMutation()

    const [saveSMPPGateway, { error: saveSMPPGatewayError }] =
        useCreateSMPPGatewayMutation()

    const error =
        saveGenericGatewayError ||
        saveBulkSMSGatewayError ||
        saveClickatellGatewayError ||
        saveSMPPGatewayError

    if (error) {
        const msg = i18n.t('Something went wrong whilst saving the gateway')

        return (
            <TemplateSidebarNavContent>
                <div data-test={dataTest('smsgateway-viewsmsgatewayadd')}>
                    <PageHeadline>{i18n.t('Add gateway')}</PageHeadline>
                    <NoticeBox error title={msg}>
                        {error.message}
                    </NoticeBox>
                </div>
            </TemplateSidebarNavContent>
        )
    }

    const onSubmit = async (values) => {
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
        <TemplateSidebarNavContent>
            <div
                data-test={dataTest('smsgateway-viewsmsgatewayadd')}
                className={styles.container}
            >
                <PageHeadline>{i18n.t('Add gateway')}</PageHeadline>

                <FormRow>
                    <SingleSelectField
                        label={i18n.t('Type')}
                        onChange={({ selected }) => setVisibleForm(selected)}
                        selected={visibleForm}
                        dataTest={dataTest(
                            'smsgateway-viewsmsgatewayadd-gatewaytype'
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
        </TemplateSidebarNavContent>
    )
}
