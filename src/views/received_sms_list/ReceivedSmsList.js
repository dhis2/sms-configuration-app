import { useDataQuery } from '@dhis2/app-service-data'
import { NoticeBox, CenteredContent, CircularLoader } from '@dhis2/ui'
import React, { useState, useEffect } from 'react'

import { RECEIVED_SMS_LIST_LABEL, RECEIVED_SMS_LIST_PATH } from './config'
import { DeleteSelectedButton } from './DeleteSelectedButton'
import { Filter } from './Filter'
import { PageHeadline } from '../../headline'
import { SmsTable } from './SmsTable'
import { dataTest } from '../../dataTest'
import { useQueryParams } from './useQueryParams'
import i18n from '../../locales'
import styles from './ReceivedSmsList.module.css'

const query = {
    inboundSms: {
        resource: 'sms/inbound',
        params: ({ page, pageSize, phoneNumber, status }) => ({
            page,
            pageSize,
            phoneNumber,
            status,
            fields: [
                'id',
                'text',
                'originator',
                'smsstatus',
                'user[userCredentials[username]]', // sender
                'receiveddate',
            ],
            order: 'receiveddate:desc',
        }),
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

            <div className={styles.topBar}>
                <Filter loading={loading} />
                <DeleteSelectedButton
                    onComplete={refetchAndClear}
                    selectedIds={selectedIds}
                />
            </div>

            <div>
                {
                    <SmsTable
                        messages={messages}
                        pager={data.inboundSms.pager}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                    />
                }
            </div>
        </div>
    )
}

export { ReceivedSmsList, RECEIVED_SMS_LIST_LABEL, RECEIVED_SMS_LIST_PATH }
