import { useHistory, useParams } from 'react-router-dom'
import React from 'react'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'

import { GATEWAY_CONFIG_LIST_PATH } from './GatewayConfigList'
import {
    GENERIC_FORM,
    BULK_SMS_FORM,
    CLICKATELL_FORM,
    GatewayBulkSMSForm,
    GatewayClickatellForm,
    GatewayGenericForm,
    useReadGatewayQuery,
    useUpdateGenericGatewayMutation,
    useUpdateBulkSMSGatewayMutation,
    useUpdateClickatellGatewayMutation,
} from '../../gateways'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'

export const GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC = '/sms-gateway/edit'
export const GATEWAY_CONFIG_FORM_EDIT_PATH = `${GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC}/:id`

export const GatewayConfigFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()

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

    const saveError =
        saveGenericGatewayError ||
        saveBulkSMSGatewayError ||
        saveClickatellGatewayError

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

            history.push(GATEWAY_CONFIG_LIST_PATH)
        } catch (e) {
            return Promise.reject(e)
        }
    }

    return (
        <div data-test={dataTest('views-gatewayconfigformedit')}>
            <PageHeadline>Edit</PageHeadline>
            {data?.gateway && (
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

                    {gatewayType === GENERIC_FORM && (
                        <GatewayGenericForm
                            initialValues={data.gateway}
                            onSubmit={onSubmit}
                        />
                    )}

                    {gatewayType === BULK_SMS_FORM && (
                        <GatewayBulkSMSForm
                            initialValues={data.gateway}
                            onSubmit={onSubmit}
                        />
                    )}

                    {gatewayType === CLICKATELL_FORM && (
                        <GatewayClickatellForm
                            initialValues={data.gateway}
                            onSubmit={onSubmit}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
