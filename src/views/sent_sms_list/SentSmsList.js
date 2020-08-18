import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import data from './data'
import SentSmsTable from './SentSmsTable'
import SmsFilter from './SmsFilter'
import { getAllIds, getAllSelected } from './selectors'
import { createToggleAllHandler, createToggleHandler } from './handlers'
import s from './SentSmsList.module.css'

export const SENT_SMS_LIST_LABEL = i18n.t('List of sent sms')
export const SENT_SMS_LIST_PATH = '/sent'

// FIXME: should be replaced with the actual resource for messages
const query = {
    messages: {
        resource: 'sms/outbound/messages',
    },
}

export const SentSmsList = () => {
    const [selected, setSelected] = useState([])
    const [filter, setFilter] = useState('ALL')
    const { loading, error } = useDataQuery(query)

    if (loading) {
        return 'Loading'
    }

    if (error) {
        return error.message
    }

    const allIds = getAllIds(data)
    const allSelected = getAllSelected(allIds, selected)

    // Handlers
    const toggleAll = createToggleAllHandler({
        allSelected,
        setSelected,
        allIds,
    })
    const toggleSelected = createToggleHandler({ selected, setSelected })
    const deleteSelected = () => {
        console.log('Delete selected messages')
    }

    return (
        <React.Fragment>
            <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
            <div className={s.header}>
                <SmsFilter filter={filter} setFilter={setFilter} />
                <div className={s.headerRight}>
                    <Button
                        small
                        destructive
                        disabled={selected.length === 0}
                        onClick={deleteSelected}
                    >
                        Delete selected messages
                    </Button>
                </div>
            </div>
            <SentSmsTable
                messages={data}
                allSelected={allSelected}
                selected={selected}
                toggleSelected={toggleSelected}
                toggleAll={toggleAll}
            />
            <div>Pagination</div>
        </React.Fragment>
    )
}
