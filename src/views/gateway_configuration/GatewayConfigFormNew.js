import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { useDataMutation } from '@dhis2/app-runtime'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import { GATEWAY_CONFIG_LIST_PATH } from './GatewayConfigList'
import {
    FormRow,
    GatewayBulkSMSForm,
    GatewayClickatellForm,
    GatewayGenericForm,
} from '../../forms'
import { PageHeadline } from '../../headline'
import i18n from '../../locales'

export const GATEWAY_CONFIG_FORM_NEW_PATH = '/sms-gateway/new'

const GENERIC_FORM = '0'
const BULK_SMS_FORM = '1'
const CLICKATELL_FORM = '2'

const SAVE_GENERIC_GATEWAY_MUTATION = {
    gateway: {
        resource: 'gateways',
        type: 'create',
        params: ({
            name,
            messageParameter,
            recipientParameter,
            urlTemplate,
            parameters,
        }) => ({
            type: 'http',
            name,
            messageParameter,
            recipientParameter,
            urlTemplate,
            ...(parameters ? { parameters } : {}),
        }),
    },
}

const SAVE_BULK_SMS_GATEWAY_MUTATION = {
    gateway: {
        resource: 'gateways',
        type: 'create',
        params: ({ name, username, password }) => ({
            type: 'bulksms',
            name,
            username,
            password,
        }),
    },
}

const SAVE_CLICKATELL_GATEWAY_MUTATION = {
    gateway: {
        resource: 'gateways',
        type: 'create',
        params: ({ name, username, authtoken, urlTemplate }) => ({
            type: 'clickatell',
            name,
            username,
            authtoken,
            urlTemplate,
        }),
    },
}

export const GatewayConfigFormNew = () => {
    const history = useHistory()
    const [visibleForm, setVisibleForm] = useState(GENERIC_FORM)
    const [saveGenericGateway] = useDataMutation(SAVE_GENERIC_GATEWAY_MUTATION)
    const [saveBulkSMSGateway] = useDataMutation(SAVE_BULK_SMS_GATEWAY_MUTATION)
    const [saveClickatellGateway] = useDataMutation(
        SAVE_CLICKATELL_GATEWAY_MUTATION
    )

    const onSubmit = async values => {
        console.log('values', values)

        try {
            console.log(
                'visibleForm === GENERIC_FORM',
                visibleForm === GENERIC_FORM
            )

            if (visibleForm === GENERIC_FORM) {
                await saveGenericGateway(values)
            }

            return Promise.resolve()

            // eslint-disable-next-line no-unreachable
            if (visibleForm === BULK_SMS_FORM) {
                await saveBulkSMSGateway(values)
            }

            if (visibleForm === CLICKATELL_FORM) {
                await saveClickatellGateway(values)
            }

            history.push(GATEWAY_CONFIG_LIST_PATH)
        } catch (e) {
            console.log('e', e)
            return Promise.reject()
        }
    }

    return (
        <div>
            <PageHeadline>SMS Gateway Configuration</PageHeadline>

            <FormRow>
                <SingleSelectField
                    label={i18n.t('Gateway type')}
                    onChange={({ selected }) => setVisibleForm(selected)}
                    selected={visibleForm}
                >
                    <SingleSelectOption
                        value={GENERIC_FORM}
                        label={i18n.t('Generic form')}
                    />

                    <SingleSelectOption
                        value={BULK_SMS_FORM}
                        label={i18n.t('BulkSMS form')}
                    />

                    <SingleSelectOption
                        value={CLICKATELL_FORM}
                        label={i18n.t('Clickatell form')}
                    />
                </SingleSelectField>
            </FormRow>

            <FormRow>
                {visibleForm === GENERIC_FORM && (
                    <GatewayGenericForm onSubmit={onSubmit} />
                )}

                {visibleForm === BULK_SMS_FORM && (
                    <GatewayBulkSMSForm onSubmit={onSubmit} />
                )}

                {visibleForm === CLICKATELL_FORM && (
                    <GatewayClickatellForm onSubmit={onSubmit} />
                )}
            </FormRow>
        </div>
    )
}
