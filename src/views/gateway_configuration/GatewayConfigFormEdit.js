import { useParams } from 'react-router-dom'
import React from 'react'

import {
    GENERIC_FORM,
    BULK_SMS_FORM,
    CLICKATELL_FORM,
    useReadGatewayQuery,
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
    const { id } = useParams()
    const { loading, error, data: jsonData } = useReadGatewayQuery(id)

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
    const onSubmit = console.log.bind(null, 'onSubmit')

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
                            onSubmit={onSubmit}
                            initialValues={data.gateway}
                        />
                    )}

                    {gatewayType === CLICKATELL_FORM && (
                        <GatewayClickatellForm
                            onSubmit={onSubmit}
                            initialValues={data.gateway}
                        />
                    )}
                </>
            )}
        </div>
    )
}
