import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import i18n from '../../locales'
import {
    CancelDialog,
    PageHeadline,
    TemplateSidebarNavContent,
    dataTest,
} from '../../shared'
import { FIELD_PASSWORD_NAME } from '../FieldPassword'
import { FIELD_PASSWORD_CONFIRMATION_NAME } from '../FieldPasswordConfirmation'
import { FormBulkSMS } from '../FormBulkSMS'
import { FormClickatell } from '../FormClickatell'
import { FormGeneric } from '../FormGeneric'
import { FormSMPP } from '../FormSMPP'
import { gatewayTypes } from '../InputSingleSelectGatewayType'
import { useReadGatewayQuery } from './useReadGatewayQuery'
import { useUpdateBulkSMSGatewayMutation } from './useUpdateBulkSMSGatewayMutation'
import { useUpdateClickatellGatewayMutation } from './useUpdateClickatellGatewayMutation'
import { useUpdateGenericGatewayMutation } from './useUpdateGenericGatewayMutation'
import { useUpdateSMPPGatewayMutation } from './useUpdateSMPPGatewayMutation'
import styles from './ViewSmsGatewayEdit.module.css'

const { GENERIC_FORM, BULK_SMS_FORM, CLICKATELL_FORM, SMPP_FORM } = gatewayTypes

export const GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC = '/sms-gateway/edit'
export const GATEWAY_CONFIG_FORM_EDIT_PATH = `${GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC}/:id`

const getFormComponent = gatewayType => {
    if (gatewayType === GENERIC_FORM) {
        return FormGeneric
    }

    if (gatewayType === BULK_SMS_FORM) {
        return FormBulkSMS
    }

    if (gatewayType === CLICKATELL_FORM) {
        return FormClickatell
    }

    if (gatewayType === SMPP_FORM) {
        return FormSMPP
    }

    throw new Error(`The gateway type does not exist, got "${gatewayType}"`)
}

const getInitialValues = gateway => {
    if (gateway.type === BULK_SMS_FORM) {
        return {
            ...gateway,
            [FIELD_PASSWORD_CONFIRMATION_NAME]: gateway[FIELD_PASSWORD_NAME],
        }
    }

    return gateway
}

export const ViewSmsGatewayEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [showCancelDialog, setShowCancelDialog] = useState(false)

    const { loading, error: loadError, data: jsonData } = useReadGatewayQuery(
        id
    )

    const [
        saveGenericGateway,
        { error: saveGenericGatewayError },
    ] = useUpdateGenericGatewayMutation()

    const [
        saveBulkSMSGateway,
        { error: saveBulkSMSGatewayError },
    ] = useUpdateBulkSMSGatewayMutation()

    const [
        saveClickatellGateway,
        { error: saveClickatellGatewayError },
    ] = useUpdateClickatellGatewayMutation()

    const [
        saveSMPPGateway,
        { error: saveSMPPGatewayError },
    ] = useUpdateSMPPGatewayMutation()

    const saveError =
        saveGenericGatewayError ||
        saveBulkSMSGatewayError ||
        saveClickatellGatewayError ||
        saveSMPPGatewayError

    if (loading) {
        return (
            <TemplateSidebarNavContent>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </TemplateSidebarNavContent>
        )
    }

    if (loadError) {
        const msg = i18n.t('Something went wrong whilst loading gateways')

        return (
            <TemplateSidebarNavContent>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {loadError.message}
                </NoticeBox>
            </TemplateSidebarNavContent>
        )
    }

    const data =
        /**
         * @TODO:
         *   * The response does not contain the right content type header
         *     -> https://jira.dhis2.org/browse/DHIS2-9252
         */
        jsonData && typeof jsonData.gateway === 'string'
            ? { gateway: JSON.parse(jsonData.gateway) }
            : jsonData

    const gatewayType = data?.gateway?.type
    const onSubmit = async formValues => {
        const values = { ...formValues, id: data.gateway.uid }

        try {
            if (values.type === GENERIC_FORM) {
                await saveGenericGateway(values)
            }

            if (values.type === BULK_SMS_FORM) {
                await saveBulkSMSGateway(values)
            }

            if (values.type === CLICKATELL_FORM) {
                await saveClickatellGateway(values)
            }

            if (values.type === SMPP_FORM) {
                await saveSMPPGateway(values)
            }

            history.push('/sms-gateway')
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const FormComponent = getFormComponent(gatewayType)
    const initialValues = gatewayType && getInitialValues(data.gateway)

    return (
        <TemplateSidebarNavContent>
            <div
                data-test={dataTest('smsgateway-viewsmsgatewayedit')}
                className={styles.container}
            >
                <PageHeadline>{i18n.t('Edit gateway')}</PageHeadline>

                {gatewayType ? (
                    <div
                        data-test={dataTest(
                            'views-gatewayconfigformedit-formcontainer'
                        )}
                        data-gateway-id={data.gateway.uid}
                    >
                        {saveError && (
                            <NoticeBox
                                error
                                title={i18n.t(
                                    'Something went wrong whilst saving gateways'
                                )}
                            >
                                {saveError.message}
                            </NoticeBox>
                        )}

                        <FormComponent
                            initialValues={initialValues}
                            onSubmit={onSubmit}
                            onCancelClick={pristine =>
                                pristine
                                    ? history.push('/sms-gateway')
                                    : setShowCancelDialog(true)
                            }
                        />
                    </div>
                ) : (
                    <NoticeBox error title={i18n.t('Gateway not found')}>
                        {i18n.t('The requested gateway could not be loaded')}
                    </NoticeBox>
                )}

                {showCancelDialog && (
                    <CancelDialog
                        onConfirmCancel={() => history.push('/sms-gateway')}
                        onAbortCancel={() => setShowCancelDialog(false)}
                    />
                )}
            </div>
        </TemplateSidebarNavContent>
    )
}
