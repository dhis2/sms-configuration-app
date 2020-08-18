import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import data from './data'
import SentSmsTable from './SentSmsTable'

export const SENT_SMS_LIST_LABEL = i18n.t('List of sent sms')
export const SENT_SMS_LIST_PATH = '/sent'

// FIXME: should be replaced with the actual resource for messages
const query = {
    me: {
        resource: 'me',
    },
}

export const SentSmsList = () => {
    const { loading, error } = useDataQuery(query)
    const [selected, setSelected] = useState([])
    const allIds = data.map(({ id }) => id)
    const isAllSelected = allIds.every(id => selected.includes(id))

    const toggleAllSelected = () => {
        if (isAllSelected) {
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

    if (loading) {
        return 'Loading'
    }

    if (error) {
        return error.message
    }

    return (
        <React.Fragment>
            <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
            <p>Filter by status: [SingleSelect]</p>
            <p>Total number of results: {data.length}</p>
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
                isAllSelected={isAllSelected}
                selected={selected}
                toggleSelected={toggleSelected}
                toggleAllSelected={toggleAllSelected}
            />
            <p>Pagination</p>
        </React.Fragment>
    )
}
