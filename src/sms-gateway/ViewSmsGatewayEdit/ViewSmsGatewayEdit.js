import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import i18n from '../../locales/index.js'
import {
    CancelDialog,
    PageHeadline,
    TemplateSidebarNavContent,
    dataTest,
} from '../../shared/index.js'
import { FormBulkSMS } from '../FormBulkSMS/index.js'
import { FormClickatell } from '../FormClickatell/index.js'
import { FormGeneric } from '../FormGeneric/index.js'
import { FormSMPP } from '../FormSMPP/index.js'
import { gatewayTypes } from '../InputSingleSelectGatewayType/index.js'
import { useReadGatewayQuery } from './useReadGatewayQuery.js'
import { useUpdateBulkSMSGatewayMutation } from './useUpdateBulkSMSGatewayMutation.js'
import { useUpdateClickatellGatewayMutation } from './useUpdateClickatellGatewayMutation.js'
import { useUpdateGenericGatewayMutation } from './useUpdateGenericGatewayMutation.js'
import { useUpdateSMPPGatewayMutation } from './useUpdateSMPPGatewayMutation.js'
import styles from './ViewSmsGatewayEdit.module.css'

const { GENERIC_FORM, BULK_SMS_FORM, CLICKATELL_FORM, SMPP_FORM } = gatewayTypes

export const GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC = '/sms-gateway/edit'
export const GATEWAY_CONFIG_FORM_EDIT_PATH = `${GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC}/:id`

const getFormComponent = (gatewayType) => {
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

const getInitialValues = (gateway) => {
    const filteredParameters = gateway?.parameters
        ? gateway.parameters.map((param) =>
              param?.confidential ? { ...param, value: null } : param
          )
        : null
    return {
        ...gateway,
        password: null,
        authToken: null,
        parameters: filteredParameters,
    }
}

export const ViewSmsGatewayEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const [showCancelDialog, setShowCancelDialog] = useState(false)

    const {
        loading,
        error: loadError,
        data: jsonData,
    } = useReadGatewayQuery(id)

    const [saveGenericGateway, { error: saveGenericGatewayError }] =
        useUpdateGenericGatewayMutation()

    const [saveBulkSMSGateway, { error: saveBulkSMSGatewayError }] =
        useUpdateBulkSMSGatewayMutation()

    const [saveClickatellGateway, { error: saveClickatellGatewayError }] =
        useUpdateClickatellGatewayMutation()

    const [saveSMPPGateway, { error: saveSMPPGatewayError }] =
        useUpdateSMPPGatewayMutation()

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
    const onSubmit = async (formValues) => {
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
                            'smsgateway-viewsmsgatewayedit-formcontainer'
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
                            onCancelClick={(pristine) =>
                                pristine
                                    ? history.push('/sms-gateway')
                                    : setShowCancelDialog(true)
                            }
                            editMode
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
