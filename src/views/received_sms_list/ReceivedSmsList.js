import { useDataQuery } from '@dhis2/app-service-data'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState, useEffect } from 'react'

import {
    RECEIVED_SMS_LIST_LABEL,
    RECEIVED_SMS_LIST_PATH,
    STATUS_ALL,
} from './config'
import DeleteSelectedButton from '../delete_selected_button/DeleteSelectedButton'
import { Filter } from './Filter'
import { PageHeadline } from '../../headline'
import { SmsTable } from './SmsTable'
import { dataTest } from '../../dataTest'
import useQueryParams from '../useQueryParams'
import i18n from '../../locales'
import styles from './ReceivedSmsList.module.css'

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
    if (status && status !== STATUS_ALL) {
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

const ReceivedSmsList = () => {
    const [selectedIds, setSelectedIds] = useState([])
    const { page, pageSize, phoneNumber, status } = useQueryParams()
    const { called, loading, error, data, refetch } = useDataQuery(query, {
        lazy: true,
    })
    const refetchAndClear = () => {
        refetch()
        setSelectedIds([])
    }

    useEffect(() => {
        refetch({ page, pageSize, phoneNumber, status })
    }, [page, pageSize, phoneNumber, status])

    if (loading || !called) {
        return (
            <>
                <PageHeadline>{RECEIVED_SMS_LIST_LABEL}</PageHeadline>
                <CenteredContent>
                    <CircularLoader />
                </CenteredContent>
            </>
        )
    }

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
                <Filter />
                <DeleteSelectedButton
                    selectedIds={selectedIds}
                    mutationResource="sms/inbound"
                    onComplete={refetchAndClear}
                />
            </header>
            <SmsTable
                messages={messages}
                pager={data.inboundSms.pager}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
            />
        </div>
    )
}

export { ReceivedSmsList, RECEIVED_SMS_LIST_LABEL, RECEIVED_SMS_LIST_PATH }
