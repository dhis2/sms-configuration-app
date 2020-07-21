import { useHistory, useParams } from 'react-router-dom'
import React from 'react'

import { GATEWAY_CONFIG_LIST_PATH } from './GatewayConfigList'
import {
    GENERIC_FORM,
    BULK_SMS_FORM,
    CLICKATELL_FORM,
    useReadGatewayQuery,
    useUpdateGenericGatewayMutation,
    useUpdateBulkSMSGatewayMutation,
    useUpdateClickatellGatewayMutation,
} from '../../gateways'
import {
    GatewayBulkSMSForm,
    GatewayClickatellForm,
    GatewayGenericForm,
} from '../../forms'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'

export const GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC = '/sms-gateway/edit'
export const GATEWAY_CONFIG_FORM_EDIT_PATH = `${GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC}/:id`

export const GatewayConfigFormEdit = () => {
    const history = useHistory()
    const { id } = useParams()
    const { loading, error, data: jsonData } = useReadGatewayQuery(id)
    const [saveGenericGateway] = useUpdateGenericGatewayMutation()
    const [saveBulkSMSGateway] = useUpdateBulkSMSGatewayMutation()
    const [saveClickatellGateway] = useUpdateClickatellGatewayMutation()

    const data =
        /**
         * @TODO:
         *   Create Jira issue for:
         *   The response does not contain the right content type header
         */
        jsonData && typeof jsonData.gateway === 'string'
            ? { gateway: JSON.parse(jsonData.gateway) }
            : jsonData

    const gatewayType = data?.gateway?.type
    const onSubmit = async values => {
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

            {loading && i18n.t('Loading...')}
            {error && i18n.t('Error: {{error}}', { error: error.message })}
            {data?.gateway && (
                <>
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
                </>
            )}
        </div>
    )
}
