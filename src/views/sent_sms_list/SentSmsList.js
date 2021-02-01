import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'
import React, { useState, useEffect } from 'react'
import { useQueryParams } from '../../hooks'
import { PageHeadline } from '../../headline'
import { DeleteSelectedButton } from '../../delete_selected_button/DeleteSelectedButton'
import i18n from '../../locales'
import { SentSmsTable } from './SentSmsTable'
import { StatusFilter } from './StatusFilter'
import styles from './SentSmsList.module.css'

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

export const SentSmsList = () => {
    const [selectedIds, setSelectedIds] = useState([])
    const { page, pageSize, status } = useQueryParams()
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
                <StatusFilter />
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
