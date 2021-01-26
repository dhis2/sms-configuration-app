import React from 'react'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import i18n from '../../locales'
import { useQueryParams } from '../../hooks'
import { createSearchString } from '../../utils'
import { statusMap } from './translations'

// From https://github.com/dhis2/dhis2-core/blob/master/dhis-2/dhis-api/src/main/java/org/hisp/dhis/sms/outbound/OutboundSmsStatus.java
const STATUS_FILTER_OPTIONS = [
    'ALL',
    'DELIVERED',
    'ERROR',
    'FAILED',
    'OUTBOUND',
    'PENDING',
    'SCHEDULED',
    'SENT',
].map(status => ({ value: status, label: statusMap[status] }))

const StatusFilter = () => {
    const { status, pageSize } = useQueryParams()
    const history = useHistory()
    const handleStatusChange = ({ selected }) => {
        history.push({
            search: createSearchString({
                status: selected,
                pageSize,
                page: 1,
            }),
        })
    }

    return (
        <SingleSelectField
            label={i18n.t('Filter by status')}
            inputWidth="200px"
            onChange={handleStatusChange}
            selected={status}
        >
            {STATUS_FILTER_OPTIONS.map(({ label, value }) => (
                <SingleSelectOption key={label} label={label} value={value} />
            ))}
        </SingleSelectField>
    )
}

export default StatusFilter
