import React, { useState, useEffect } from 'react'
import { useDataQuery } from '@dhis2/app-service-data'
import i18n from '@dhis2/d2-i18n'
import { dataTest } from '../../dataTest'
import { Filter } from './Filter'
import { DeleteSelectedButton } from './DeleteSelectedButton'
import { SmsTable } from './SmsTable'
import { RECEIVED_SMS_LIST_LABEL, RECEIVED_SMS_LIST_PATH } from './config'
import { SmsTableLoader } from './SmsTableLoader'
import { SmsTableError } from './SmsTableError'
import { useQueryParams } from './useQueryParams'
import styles from './ReceivedSmsList.module.css'
import { PageHeadline } from '../../headline'

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

    return (
        <div data-test={dataTest('views-receivedsmslist')}>
            <PageHeadline>{i18n.t('List of received SMS')}</PageHeadline>
            <div className={styles.topBar}>
                <Filter loading={loading} />
                <DeleteSelectedButton
                    onComplete={refetchAndClear}
                    selectedIds={selectedIds}
                />
            </div>
            <div>
                {(loading || !called) && <SmsTableLoader />}
                {error && !loading && <SmsTableError message={error.message} />}
                {data && (
                    <SmsTable
                        messages={data.inboundSms.inboundsmss}
                        pager={data.inboundSms.pager}
                        selectedIds={selectedIds}
                        setSelectedIds={setSelectedIds}
                        refetchList={refetch}
                    />
                )}
            </div>
        </div>
    )
}

export { ReceivedSmsList, RECEIVED_SMS_LIST_LABEL, RECEIVED_SMS_LIST_PATH }
