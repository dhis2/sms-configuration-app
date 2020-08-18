import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import { SingleSelectField, SingleSelectOption } from '@dhis2/ui'
import i18n from '../../locales'

/**
 * Using ALL instead of a more sensible empty string due to a bug in the Select
 * https://github.com/dhis2/ui/issues/245
 */

const filterOptions = [
    { label: i18n.t('Sent'), value: 'SENT' },
    { label: i18n.t('All'), value: 'ALL' },
]

const SmsFilter = ({ filter, setFilter }) => (
    <SingleSelectField
        label={i18n.t('Filter by status')}
        inputWidth="200px"
        onChange={({ selected }) => setFilter(selected)}
        selected={filter}
    >
        {filterOptions.map(({ label, value }) => (
            <SingleSelectOption key={label} label={label} value={value} />
        ))}
    </SingleSelectField>
)

SmsFilter.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
}

export default SmsFilter
