import { useDataQuery } from '@dhis2/app-runtime'
import { Button, NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState, useEffect, useContext } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import i18n from '../../locales'
import {
    AlertContext,
    DeleteConfirmationDialog,
    PageHeadline,
    useQueryParams,
    TemplateSidebarNavContent,
    dataTest,
} from '../../shared'
import { Filter } from '../Filter'
import { ReceivedSmsTable } from '../ReceivedSmsTable'
import { useDeleteMutation } from './useDeleteMutation'
import styles from './ViewReceivedSmsList.module.css'

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

export const ViewReceivedSmsList = () => {
    const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
        useState(false)
    const [selectedIds, setSelectedIds] = useState([])
    const [queryParams, setQueryParams] = useQueryParams()
    const { page, pageSize, phoneNumber, status } = queryParams
    const setPhoneNumber = (phoneNumber) => {
        setQueryParams({ phoneNumber, page: 1 }, 'replaceIn')
    }
    const setStatus = (status) => {
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
    const { callback: debouncedRefetch } = useDebouncedCallback(refetch, 500, {
        leading: true,
    })

    useEffect(() => {
        debouncedRefetch({ page, pageSize, phoneNumber, status })
    }, [page, pageSize, phoneNumber, status])

    const { addAlert } = useContext(AlertContext)
    const [deleteSms] = useDeleteMutation({
        onComplete: () => {
            setShowDeleteConfirmationDialog(false)
            refetch()
            setSelectedIds([])
        },
        onError: (error) =>
            addAlert({
                type: 'critical',
                message: error.message,
            }),
    })
    const onDeleteClick = () => deleteSms({ ids: selectedIds })
    const onCancelClick = () => setShowDeleteConfirmationDialog(false)

    if (error) {
        const msg = i18n.t('Something went wrong whilst loading received SMSes')

        return (
            <TemplateSidebarNavContent>
                <PageHeadline>{RECEIVED_SMS_LIST_LABEL}</PageHeadline>
                <NoticeBox error title={msg}>
                    {error.message}
                </NoticeBox>
            </TemplateSidebarNavContent>
        )
    }

    const messages = data?.inboundSms?.inboundsmss || []

    return (
        <TemplateSidebarNavContent>
            <div
                data-test={dataTest('smsinbound-viewreceivedsmslist')}
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
                    <ReceivedSmsTable
                        messages={messages}
                        pager={data.inboundSms.pager}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                    />
                )}
            </div>
        </TemplateSidebarNavContent>
    )
}
