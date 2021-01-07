import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import React, { useState } from 'react'

import { PageHeadline } from '../../headline'
import SmsTable from './SmsTable'
import StatusFilter, { parseStatus } from './StatusFilter'
import { getAllIds, getAllSelected } from './selectors'
import {
    createToggleAllHandler,
    createToggleHandler,
    createCleanSelectedHandler,
} from './handlers'
import DeleteSelectedButton from './DeleteSelectedButton'
import RefetchSms from './RefetchSms'
import i18n from '../../locales'
import styles from './SentSmsList.module.css'

export const SENT_SMS_LIST_LABEL = i18n.t('Sent')
export const SENT_SMS_LIST_PATH = '/sent'

const parseParams = ({ status, page, pageSize }) => {
    const base = {
        pageSize,
        page,
        fields: ['id', 'message', 'status', 'date', 'recipients'],
        order: 'date:desc',
    }

    if (!status) {
        return base
    }

    return {
        ...base,
        filter: `status:eq:${status}`,
    }
}

const query = {
    sms: {
        resource: 'sms/outbound',
        params: parseParams,
    },
}

const deduplicateSms = smses =>
    Object.values(
        smses.reduce((smsesById, sms) => {
            smsesById[sms.id] = sms
            return smsesById
        }, {})
    )

export const SentSmsList = () => {
    const [selected, setSelected] = useState([])
    const [status, setStatus] = useState('ALL')
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: {
            status: parseStatus(status),
            pageSize: 10,
            page: 1,
        },
    })

    if (loading) {
        return (
            <>
                <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

    if (error) {
        const msg = i18n.t('Something went wrong whilst loading sent SMSes')

        return (
            <>
                <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </>
        )
    }

    // Backend returns duplicate outbound SMS messages (see https://jira.dhis2.org/browse/DHIS2-9480)
    // but `SmsTable` component assumes that each SMS ID in its `smes` prop is unique as it uses them as keys
    const smses = deduplicateSms(data.sms.outboundsmss)

    // Selectors
    const allIds = getAllIds(smses)
    const allSelected = getAllSelected(allIds, selected)

    // Handlers
    const cleanSelected = createCleanSelectedHandler({ selected, setSelected })
    const toggleAll = createToggleAllHandler({
        allSelected,
        setSelected,
        allIds,
    })
    const toggleSelected = createToggleHandler({ selected, setSelected })

    // Context
    const context = {
        refetch,
        refetchAndClear: params => {
            setSelected([])
            refetch(params)
        },
    }

    return (
        <div className={styles.container}>
            <RefetchSms.Provider value={context}>
                <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
                <div className={styles.header}>
                    <StatusFilter status={status} setStatus={setStatus} />
                    <div className={styles.headerRight}>
                        <DeleteSelectedButton selected={selected} />
                    </div>
                </div>
                <SmsTable
                    smses={smses}
                    cleanSelected={cleanSelected}
                    allSelected={allSelected}
                    selected={selected}
                    toggleSelected={toggleSelected}
                    toggleAll={toggleAll}
                    pager={data.sms.pager}
                />
            </RefetchSms.Provider>
        </div>
    )
}
