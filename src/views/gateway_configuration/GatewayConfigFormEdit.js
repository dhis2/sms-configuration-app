import { useDataQuery } from '@dhis2/app-runtime'
import { useParams } from 'react-router-dom'
import React from 'react'
import i18n from '../../locales'

import { GENERIC_FORM, BULK_SMS_FORM, CLICKATELL_FORM } from '../../gateways'
import {
    GatewayBulkSMSForm,
    GatewayClickatellForm,
    GatewayGenericForm,
} from '../../forms'

export const GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC = '/sms-gateway/edit'
export const GATEWAY_CONFIG_FORM_EDIT_PATH = `${GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC}/:id`

export const GatewayConfigFormEdit = () => {
    const { id } = useParams()
    const { loading, error, data: jsonData } = useDataQuery({
        gateway: {
            resource: 'gateways',
            id,
        },
    })

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
        <div>
            <h1>Edit</h1>

            {loading && i18n.t('Loading...')}
            {error && i18n.t('Error: %error%', { error: error.message })}
            {data?.gateway && (
                <code>
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
                </code>
            )}
        </div>
    )
}
