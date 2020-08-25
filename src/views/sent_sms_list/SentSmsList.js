import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import i18n from '../../locales'
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
import s from './SentSmsList.module.css'

export const SENT_SMS_LIST_LABEL = i18n.t('List of sent SMSes')
export const SENT_SMS_LIST_PATH = '/sent'

const parseParams = ({ status, page, pageSize }) => {
    const base = {
        pageSize,
        page,
        fields: ['id', 'message', 'status', 'date', 'recipients'],
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
            <React.Fragment>
                <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </React.Fragment>
        )
    }

    if (error) {
        const msg = i18n.t('Something went wrong whilst loading sent SMSes')

        return (
            <React.Fragment>
                <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </React.Fragment>
        )
    }

    // Selectors
    const allIds = getAllIds(data.sms.outboundsmss)
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
        <RefetchSms.Provider value={context}>
            <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
            <div className={s.header}>
                <StatusFilter status={status} setStatus={setStatus} />
                <div className={s.headerRight}>
                    <DeleteSelectedButton selected={selected} />
                </div>
            </div>
            <SmsTable
                smses={data.sms.outboundsmss}
                cleanSelected={cleanSelected}
                allSelected={allSelected}
                selected={selected}
                toggleSelected={toggleSelected}
                toggleAll={toggleAll}
                pager={data.sms.pager}
            />
        </RefetchSms.Provider>
    )
}
