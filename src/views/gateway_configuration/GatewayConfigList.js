import { Button, ButtonStrip } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useContext, useState } from 'react'

import { GATEWAY_CONFIG_FORM_NEW_PATH } from './GatewayConfigFormNew'
import { AlertContext, useCriticalNotification } from '../../notifications'
import {
    GatewayList,
    useDeleteGatewaysMutation,
    useReadGatewaysQuery,
    useSetDefaultGatewayMutation,
} from '../../gateways'
import { PageHeadline } from '../../headline'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './GatewayConfigList.module.css'

export const GATEWAY_CONFIG_LIST_PATH = `/sms-gateway/list`
export const GATEWAY_CONFIG_LIST_LABEL = 'SMS Gateways'

export const GatewayConfigList = () => {
    const history = useHistory()
    const onAddGatewayClick = () => history.push(GATEWAY_CONFIG_FORM_NEW_PATH)
    const [checkedGateways, setCheckedGateways] = useState([])
    const { addAlert } = useContext(AlertContext)

    const {
        loading: loadingReadGateways,
        error: errorReadGateways,
        data: jsonData,
        refetch: refetchReadGateways,
    } = useReadGatewaysQuery()

    const [
        deleteCheckedGateways,
        { loading: loadingDelete, error: errorDelete },
    ] = useDeleteGatewaysMutation()

    const [
        makeGatewayDefault,
        { loading: loadingSetDefault, error: errorSetDefault },
    ] = useSetDefaultGatewayMutation()

    const onDeleteClick = () => {
        const variables = { ids: checkedGateways }
        deleteCheckedGateways(variables).then(refetchReadGateways)
    }

    const onMakeDefaultClick = id => {
        const variables = { id }
        makeGatewayDefault(variables).then(refetchReadGateways)
    }

    useCriticalNotification(addAlert, errorDelete)
    useCriticalNotification(addAlert, errorSetDefault)

    const data =
        /**
         * @TODO:
         *   Create Jira issue for:
         *   The response does not contain the right content type header
         */
        jsonData && typeof jsonData.gateways === 'string'
            ? { gateways: JSON.parse(jsonData.gateways) }
            : jsonData

    const loading = loadingReadGateways || loadingDelete || loadingSetDefault

    return (
        <div
            className={styles.container}
            data-test={dataTest('views-gatewayconfiglist')}
        >
            <PageHeadline>SMS Gateway Configuration</PageHeadline>

            <p>
                {i18n.t(
                    'There are five different types of Gateways supported by SMS Service. SMS can be sent if any one of the gateway is configured. If more than one gateways are present, then they will be used in round-robin fashion for load balancing'
                )}
            </p>

            <div className={styles.actions}>
                <ButtonStrip>
                    <Button
                        primary
                        onClick={onAddGatewayClick}
                        disabled={loadingDelete}
                    >
                        Add gateway
                    </Button>

                    <Button
                        destructive
                        onClick={onDeleteClick}
                        disabled={!checkedGateways.length || loadingDelete}
                    >
                        Delete selected gateway configurations
                    </Button>

                    <React.Fragment />
                </ButtonStrip>
            </div>

            {loadingReadGateways && i18n.t('Loading gateway configurations')}
            {errorReadGateways &&
                i18n.t('Something went wrong: %s', errorReadGateways.message)}
            {data?.gateways?.gateways && (
                <GatewayList
                    processing={loading}
                    checkedGateways={checkedGateways}
                    setCheckedGateways={setCheckedGateways}
                    gateways={data.gateways.gateways}
                    onMakeDefaultClick={onMakeDefaultClick}
                />
            )}
        </div>
    )
}
