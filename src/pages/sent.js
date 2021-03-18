import { useDataQuery } from '@dhis2/app-runtime'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState, useEffect } from 'react'
import { DeleteSelectedButton } from '../components/delete_selected_button/DeleteSelectedButton'
import { PageHeadline } from '../components/headline'
import { useQueryParams } from '../components/hooks'
import { StatusFilter } from '../components/SentSmsListFilter/StatusFilter'
import { SentSmsTable } from '../components/SentSmsTable/SentSmsTable'
import i18n from '../locales'
import styles from './sent.module.css'

export const SENT_SMS_LIST_LABEL = i18n.t('Sent')
export const SENT_SMS_LIST_PATH = '/sent'

const parseParams = ({ status, page, pageSize }) => {
    const params = {
        pageSize,
        page,
        fields: ['id', 'message', 'status', 'date', 'recipients'],
        order: 'date:desc',
    }

    if (status && status !== 'ALL') {
        params.filter = `status:eq:${status}`
    }

    return params
}

const query = {
    sms: {
        resource: 'sms/outbound',
        params: parseParams,
    },
}

export const Sent = () => {
    const [selectedIds, setSelectedIds] = useState([])
    const [queryParams, setQueryParams] = useQueryParams()
    const { page, pageSize, status } = queryParams
    const setStatus = status => {
        setQueryParams({ status, page: 1 })
    }
    const { called, loading, error, data, refetch } = useDataQuery(query, {
        lazy: true,
    })
    const refetchAndClear = () => {
        refetch()
        setSelectedIds([])
    }

    useEffect(() => {
        refetch({ page, pageSize, status })
    }, [page, pageSize, status])

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

    const messages = data?.sms?.outboundsmss || []

    return (
        <div className={styles.container}>
            <PageHeadline>{SENT_SMS_LIST_LABEL}</PageHeadline>
            <header className={styles.header}>
                <StatusFilter status={status} setStatus={setStatus} />
                <DeleteSelectedButton
                    selectedIds={selectedIds}
                    type="outbound"
                    onComplete={refetchAndClear}
                />
            </header>
            {loading || !called ? (
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            ) : (
                <SentSmsTable
                    messages={messages}
                    pager={data.sms.pager}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                />
            )}
        </div>
    )
}
