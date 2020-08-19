import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import i18n from '../../locales'
import RefetchSms from './RefetchSms'

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

const filterOptions = [
    { label: i18n.t('All'), value: 'ALL' },
    { label: i18n.t('Sent'), value: 'SENT' },
    { label: i18n.t('Error'), value: 'ERROR' },
    { label: i18n.t('Outbound'), value: 'OUTBOUND' },
]

const StatusFilter = ({ filter, setFilter }) => {
    const refetch = useContext(RefetchSms)
    const onChange = ({ selected }) => {
        setFilter(selected)
        refetch({
            status: parseFilter(selected),
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
