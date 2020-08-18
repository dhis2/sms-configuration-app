import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import data from './data'
import SentSmsTable from './SentSmsTable'
import SmsFilter from './SmsFilter'
import * as selectors from './selectors'

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

    const allIds = selectors.getAllIds(data)
    const isEverythingSelected = selectors.getIsEverythingSelected(
        allIds,
        selected
    )

    /**
     * Handlers
     */

    const toggleAllSelected = () => {
        if (isEverythingSelected) {
            return setSelected([])
        }

        return setSelected(allIds)
    }
    const toggleSelected = id => {
        const isSelected = selected.includes(id)

        if (isSelected) {
            const filtered = selected.filter(currentId => currentId !== id)
            return setSelected(filtered)
        }

        return setSelected([...selected, id])
    }

    const onClick = () => {
        console.log('Delete selected messages')
    }

    return (
        <React.Fragment>
            <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
            <p>
                <SmsFilter filter={filter} setFilter={setFilter} />
            </p>
            <p>
                <Button
                    small
                    destructive
                    disabled={selected.length === 0}
                    onClick={onClick}
                >
                    Delete selected messages
                </Button>
            </p>
            <SentSmsTable
                messages={data}
                isEverythingSelected={isEverythingSelected}
                selected={selected}
                toggleSelected={toggleSelected}
                toggleAllSelected={toggleAllSelected}
            />
            <p>Pagination</p>
        </React.Fragment>
    )
}
