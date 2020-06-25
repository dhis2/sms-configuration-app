import { Button, ButtonStrip } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import { useDataQuery } from '@dhis2/app-runtime'
import React, { useState } from 'react'

import { GATEWAY_CONFIG_FORM_NEW_PATH } from './GatewayConfigFormNew'
import { GatewayList } from '../../gateways'
import { PageHeadline } from '../../headline'
import i18n from '../../locales'
import styles from './GatewayConfigList.module.css'

export const GATEWAY_CONFIG_LIST_PATH = `/sms-gateway/list`
export const GATEWAY_CONFIG_LIST_LABEL = 'SMS Gateways'

/**
 * @TODO:
 *   Create Jira issues for:
 *   * The "fields" param does not work
 *   * id field is not present, only uid
 */
const GATEWAYS_QUERY = {
    gateways: {
        resource: 'gateways.json',
        params: {
            //fields: 'id,name,isDefault',
        },
    },
}

export const GatewayConfigList = () => {
    const { loading, error, data: jsonData } = useDataQuery(GATEWAYS_QUERY)
    const [checkedGateways, setCheckedGateways] = useState([])
    const history = useHistory()
    const onAddGatewayClick = () => history.push(GATEWAY_CONFIG_FORM_NEW_PATH)
    const deleteCheckedGateways = () => null
    const data =
        /**
         * @TODO:
         *   Create Jira issue for:
         *   The response does not contain the right content type header
         */
        jsonData && typeof jsonData.gateways === 'string'
            ? JSON.parse(jsonData.gateways)
            : jsonData

    console.log('data', data)

    return (
        <div className={styles.container}>
            <PageHeadline>SMS Gateway Configuration</PageHeadline>

            <p>
                {i18n.t(
                    'There are five different types of Gateways supported by SMS Service. SMS can be sent if any one of the gateway is configured. If more than one gateways are present, then they will be used in round-robin fashion for load balancing'
                )}
            </p>

            <div className={styles.actions}>
                <ButtonStrip>
                    <Button primary onClick={onAddGatewayClick}>
                        Add gateway
                    </Button>

                    <Button
                        destructive
                        onClick={deleteCheckedGateways}
                        disabled={!checkedGateways.length}
                    >
                        Delete selected gateway configurations
                    </Button>

                    <React.Fragment />
                </ButtonStrip>
            </div>

            {loading && i18n.t('Loading gateway configurations')}
            {error && i18n.t('Something went wrong: %s', error.message)}
            {data && (
                <GatewayList
                    checkedGateways={checkedGateways}
                    setCheckedGateways={setCheckedGateways}
                    gateways={data.gateways}
                />
            )}
        </div>
    )
}
