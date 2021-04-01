import { useDataQuery } from '@dhis2/app-runtime'
import { Button, NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState, useEffect, useContext } from 'react'
import i18n from '../../../locales'
import {
    DeleteConfirmationDialog,
    PageHeadline,
    AlertContext,
    useQueryParams,
} from '../../../shared'
import { StatusFilter, SentSmsTable } from '../../components'
import styles from './SentSmsList.module.css'
import { useDeleteMutation } from './useDeleteMutation'

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
    const [
        showDeleteConfirmationDialog,
        setShowDeleteConfirmationDialog,
    ] = useState(false)
    const [selectedIds, setSelectedIds] = useState([])
    const [queryParams, setQueryParams] = useQueryParams()
    const { page, pageSize, status } = queryParams
    const setStatus = status => {
        setQueryParams({ status, page: 1 })
    }
    const { called, loading, error, data, refetch } = useDataQuery(query, {
        lazy: true,
    })

    useEffect(() => {
        refetch({ page, pageSize, status })
    }, [page, pageSize, status])

    const { addAlert } = useContext(AlertContext)
    const [deleteSms] = useDeleteMutation({
        onComplete: () => {
            setShowDeleteConfirmationDialog(false)
            refetch()
            setSelectedIds([])
        },
        onError: error =>
            addAlert({
                type: 'critical',
                message: error.message,
            }),
    })
    const onDeleteClick = () => deleteSms({ ids: selectedIds })
    const onCancelClick = () => setShowDeleteConfirmationDialog(false)

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

                <Button
                    destructive
                    onClick={() => setShowDeleteConfirmationDialog(true)}
                    disabled={selectedIds.length === 0}
                >
                    {i18n.t('Delete selected')}
                </Button>

                {showDeleteConfirmationDialog && (
                    <DeleteConfirmationDialog
                        onCancelClick={onCancelClick}
                        onDeleteClick={onDeleteClick}
                    >
                        {i18n.t(
                            'Are you sure you want to delete the selected sms?'
                        )}
                    </DeleteConfirmationDialog>
                )}
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
