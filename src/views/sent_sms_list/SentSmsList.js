import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { NoticeBox } from '@dhis2/ui'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import SmsTable from './SmsTable'
import StatusFilter, { parseFilter } from './StatusFilter'
import { getAllIds, getAllSelected } from './selectors'
import { createToggleAllHandler, createToggleHandler } from './handlers'
import DeleteSelectedButton from './DeleteSelectedButton'
import RefetchSms from './RefetchSms'
import s from './SentSmsList.module.css'

export const SENT_SMS_LIST_LABEL = i18n.t('List of sent SMSes')
export const SENT_SMS_LIST_PATH = '/sent'

const query = {
    messages: {
        resource: 'sms/outbound/messages',
        params: ({ status }) => ({ status }),
    },
}

export const SentSmsList = () => {
    const [selected, setSelected] = useState([])
    const [filter, setFilter] = useState('ALL')
    const { loading, error, data, refetch } = useDataQuery(query, {
        variables: {
            status: parseFilter(filter),
        },
    })

    if (loading) {
        return (
            <React.Fragment>
                <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
                <p>{i18n.t('Loading sent SMSes')}</p>
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

    const allIds = getAllIds(data.messages)
    const allSelected = getAllSelected(allIds, selected)

    // Handlers
    const toggleAll = createToggleAllHandler({
        allSelected,
        setSelected,
        allIds,
    })
    const toggleSelected = createToggleHandler({ selected, setSelected })

    return (
        <RefetchSms.Provider value={refetch}>
            <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
            <div className={s.header}>
                <StatusFilter filter={filter} setFilter={setFilter} />
                <div className={s.headerRight}>
                    <DeleteSelectedButton selected={selected} />
                </div>
            </div>
            <SmsTable
                messages={data.messages}
                allSelected={allSelected}
                selected={selected}
                toggleSelected={toggleSelected}
                toggleAll={toggleAll}
            />
            <div>Pagination</div>
        </RefetchSms.Provider>
    )
}
