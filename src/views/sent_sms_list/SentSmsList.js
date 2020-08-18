import React, { useState } from 'react'
import { useDataQuery } from '@dhis2/app-runtime'
import { Button, SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import i18n from '../../locales'
import { PageHeadline } from '../../headline'
import data from './data'
import SentSmsTable from './SentSmsTable'

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

    const filterOptions = [
        { label: i18n.t('Sent'), value: 'SENT' },
        // Using ALL instead of a more sensible empty string due to a bug in the Select
        // https://github.com/dhis2/ui/issues/245
        { label: i18n.t('All'), value: 'ALL' },
    ]

    return (
        <React.Fragment>
            <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
            <p>
                <SingleSelectField
                    label={i18n.t('Filter by status')}
                    inputWidth="200px"
                    onChange={({ selected }) => setFilter(selected)}
                    selected={filter}
                >
                    {filterOptions.map(({ label, value }) => (
                        <SingleSelectOption
                            key={label}
                            label={label}
                            value={value}
                        />
                    ))}
                </SingleSelectField>
            </p>
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
