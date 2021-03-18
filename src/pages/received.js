import { useDataQuery } from '@dhis2/app-runtime'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { DeleteSelectedButton } from '../components/delete_selected_button/DeleteSelectedButton'
import { PageHeadline } from '../components/headline'
import { useQueryParams } from '../components/hooks'
import { Filter } from '../components/ReceivedSmsListFilter/Filter'
import { ReceivedSmsTable } from '../components/ReceivedSmsTable/ReceivedSmsTable'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import styles from './received.module.css'

export const RECEIVED_SMS_LIST_LABEL = i18n.t('Received')
export const RECEIVED_SMS_LIST_PATH = '/received'

const parseParams = ({ page, pageSize, phoneNumber, status }) => {
    const params = {
        page,
        pageSize,
        fields: [
            'id',
            'text',
            'originator',
            'smsstatus',
            'user[userCredentials[username]]', // sender
            'receiveddate',
        ],
        order: 'receiveddate:desc',
    }

    const filters = []
    if (phoneNumber) {
        filters.push(`originator:ilike:${phoneNumber}`)
    }
    if (status && status !== 'ALL') {
        filters.push(`smsstatus:eq:${status}`)
    }

    if (filters.length > 0) {
        params.filter = filters
    }

    return params
}

const query = {
    inboundSms: {
        resource: 'sms/inbound',
        params: parseParams,
    },
}

export const Received = () => {
    const [selectedIds, setSelectedIds] = useState([])
    const [queryParams, setQueryParams] = useQueryParams()
    const { page, pageSize, phoneNumber, status } = queryParams
    const setPhoneNumber = phoneNumber => {
        setQueryParams({ phoneNumber, page: 1 }, 'replaceIn')
    }
    const setStatus = status => {
        setQueryParams({ status, page: 1 })
    }
    const handleFilterReset = () => {
        setQueryParams({
            phoneNumber: undefined,
            status: undefined,
            page: 1,
        })
    }
    const { called, loading, error, data, refetch } = useDataQuery(query, {
        lazy: true,
    })
    const refetchAndClear = () => {
        refetch()
        setSelectedIds([])
    }
    const { callback: debouncedRefetch } = useDebouncedCallback(refetch, 500, {
        leading: true,
    })

    useEffect(() => {
        debouncedRefetch({ page, pageSize, phoneNumber, status })
    }, [page, pageSize, phoneNumber, status])

    if (error) {
        const msg = i18n.t('Something went wrong whilst loading received SMSes')

        return (
            <>
                <PageHeadline>{RECEIVED_SMS_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </>
        )
    }

    const messages = data?.inboundSms?.inboundsmss || []

    return (
        <div
            data-test={dataTest('views-receivedsmslist')}
            className={styles.container}
        >
            <PageHeadline>{RECEIVED_SMS_LIST_LABEL}</PageHeadline>
            <header className={styles.header}>
                <Filter
                    status={status}
                    setStatus={setStatus}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    onReset={handleFilterReset}
                />
                <DeleteSelectedButton
                    selectedIds={selectedIds}
                    type="inbound"
                    onComplete={refetchAndClear}
                />
            </header>
            {loading || !called ? (
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            ) : (
                <ReceivedSmsTable
                    messages={messages}
                    pager={data.inboundSms.pager}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                />
            )}
        </div>
    )
}
