import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import i18n from '../../locales'
import RefetchSms from './RefetchSms'
import { statusMap } from './translations'

/**
 * Using ALL instead of a more sensible empty string due to a bug in the Select,
 * which means the select doesn't allow empty strings as values.
 * https://github.com/dhis2/ui/issues/245
 */

export const parseFilter = filter => {
    if (filter === 'ALL') {
        return ''
    }

    return filter
}

// From https://github.com/dhis2/dhis2-core/blob/master/dhis-2/dhis-api/src/main/java/org/hisp/dhis/sms/outbound/OutboundSmsStatus.java
const statuses = [
    'DELIVERED',
    'ERROR',
    'FAILED',
    'OUTBOUND',
    'PENDING',
    'SCHEDULED',
    'SENT',
]
const filterOptions = [
    { label: i18n.t('All'), value: 'ALL' },
    // Using the translations from statusmap as labels
    ...statuses.map(status => ({ label: statusMap[status], value: status })),
]

const StatusFilter = ({ filter, setFilter }) => {
    const refetch = useContext(RefetchSms)
    const onChange = ({ selected }) => {
        setFilter(selected)
        refetch({
            status: parseFilter(selected),
            // Reset to the first page after filtering
            page: 1,
        })
    }

    return (
        <SingleSelectField
            label={i18n.t('Filter by status')}
            inputWidth="200px"
            onChange={onChange}
            selected={filter}
        >
            {filterOptions.map(({ label, value }) => (
                <SingleSelectOption key={label} label={label} value={value} />
            ))}
        </SingleSelectField>
    )
}

StatusFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}

export default StatusFilter
