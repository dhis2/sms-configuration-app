import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'

import { GATEWAY_CONFIG_FORM_NEW_PATH } from './GatewayConfigFormNew'
import {
    DeleteGatewaysConfirmationDialog,
    GatewayList,
    useDeleteGatewaysMutation,
    useReadGatewaysQuery,
    useSetDefaultGatewayMutation,
} from '../../gateways'
import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import { Paragraph } from '../../text'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './GatewayConfigList.module.css'

export const GATEWAY_CONFIG_LIST_PATH = '/sms-gateway'
export const GATEWAY_CONFIG_LIST_LABEL = 'Gateway configuration'

export const GatewayConfigList = () => {
    const history = useHistory()
    const onAddGatewayClick = () => history.push(GATEWAY_CONFIG_FORM_NEW_PATH)
    const [checkedGateways, setCheckedGateways] = useState([])
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const {
        loading: loadingReadGateways,
        error: errorReadGateways,
        data,
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
        setShowDeleteDialog(false)
    }

    const onMakeDefaultClick = id => {
        const variables = { id }
        makeGatewayDefault(variables).then(refetchReadGateways)
    }

    const loading = loadingReadGateways || loadingDelete || loadingSetDefault

    if (loading) {
        return (
            <>
                <PageHeadline>{GATEWAY_CONFIG_LIST_LABEL}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    const error = errorReadGateways || errorDelete || errorSetDefault

    if (error) {
        const msg = i18n.t(
            'Something went wrong whilst performing the requested operation'
        )

        return (
            <>
                <PageHeadline>{GATEWAY_CONFIG_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </>
        )
    }

    const hasGateways = !!data?.gateways?.gateways?.length

    return (
        <div
            className={styles.container}
            data-test={dataTest('views-gatewayconfiglist')}
        >
            <PageHeadline>{GATEWAY_CONFIG_LIST_LABEL}</PageHeadline>

            <Paragraph>
                {i18n.t(
                    'An SMS gateway lets a DHIS2 instance send and receive SMS messages. Different gateway types can be added and configured below. At least one gateway is needed to send and receive SMS messages. Load balancing will use all gateways if there are multiple available. Read about gateway configuration in the DHIS2 documentation.'
                )}
            </Paragraph>

            <ListActions
                addLabel={i18n.t('Add gateway')}
                deleteLabel={i18n.t('Delete selected')}
                dataTest="views-gatewayconfiglist"
                onAddClick={onAddGatewayClick}
                onDeleteClick={() => setShowDeleteDialog(true)}
                disableAdd={loadingDelete}
                disableDelete={!checkedGateways.length || loadingDelete}
            />

            {hasGateways ? (
                <GatewayList
                    processing={loading}
                    checkedGateways={checkedGateways}
                    setCheckedGateways={setCheckedGateways}
                    gateways={data.gateways.gateways}
                    onMakeDefaultClick={onMakeDefaultClick}
                />
            ) : (
                <NoticeBox info title={i18n.t('No gateways found')}>
                    {i18n.t(
                        "It looks like there aren't any configured gateways, or they couldn't be loaded."
                    )}
                </NoticeBox>
            )}

            {showDeleteDialog && (
                <DeleteGatewaysConfirmationDialog
                    onCancelClick={() => setShowDeleteDialog(false)}
                    onDeleteClick={onDeleteClick}
                />
            )}
        </div>
    )
}
