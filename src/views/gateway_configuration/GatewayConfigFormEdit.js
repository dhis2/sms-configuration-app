import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { CancelDialog } from '../../cancelDialog'
import { dataTest } from '../../dataTest'
import {
    GENERIC_FORM,
    BULK_SMS_FORM,
    CLICKATELL_FORM,
    SMPP_FORM,
    FIELD_GATEWAY_PASSWORD_CONFIRMATION_NAME,
    FIELD_GATEWAY_PASSWORD_NAME,
    GatewayBulkSMSForm,
    GatewayClickatellForm,
    GatewayGenericForm,
    GatewaySMPPForm,
    useReadGatewayQuery,
    useUpdateGenericGatewayMutation,
    useUpdateBulkSMSGatewayMutation,
    useUpdateClickatellGatewayMutation,
    useUpdateSMPPGatewayMutation,
} from '../../gateways'
import { PageHeadline } from '../../headline'
import i18n from '../../locales'
import styles from './GatewayConfigFormEdit.module.css'
import { GATEWAY_CONFIG_LIST_PATH } from './GatewayConfigList'

export const GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC = '/sms-gateway/edit'
export const GATEWAY_CONFIG_FORM_EDIT_PATH = `${GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC}/:id`

const getFormComponent = gatewayType => {
    if (gatewayType === GENERIC_FORM) {
        return GatewayGenericForm
    }

    if (gatewayType === BULK_SMS_FORM) {
        return GatewayBulkSMSForm
    }

    if (gatewayType === CLICKATELL_FORM) {
        return GatewayClickatellForm
    }

    if (gatewayType === SMPP_FORM) {
        return GatewaySMPPForm
    }

    throw new Error(`The gateway type does not exist, got "${gatewayType}"`)
}

const getInitialValues = gateway => {
    if (gateway.type === BULK_SMS_FORM) {
        return {
            ...gateway,
            [FIELD_GATEWAY_PASSWORD_CONFIRMATION_NAME]:
                gateway[FIELD_GATEWAY_PASSWORD_NAME],
        }
    }

    return gateway
}

export const GatewayConfigFormEdit = () => {
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
            <>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    if (loadError) {
        const msg = i18n.t('Something went wrong whilst loading gateways')

        return (
            <>
                <PageHeadline>{i18n.t('Edit')}</PageHeadline>
                <NoticeBox error title={msg}>
                    {loadError.message}
                </NoticeBox>
            </>
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

            history.push(GATEWAY_CONFIG_LIST_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    const FormComponent = getFormComponent(gatewayType)
    const initialValues = gatewayType && getInitialValues(data.gateway)

    return (
        <div
            data-test={dataTest('views-gatewayconfigformedit')}
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
                                ? history.push(GATEWAY_CONFIG_LIST_PATH)
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
                    onConfirmCancel={() =>
                        history.push(GATEWAY_CONFIG_LIST_PATH)
                    }
                    onAbortCancel={() => setShowCancelDialog(false)}
                />
            )}
        </div>
    )
}
