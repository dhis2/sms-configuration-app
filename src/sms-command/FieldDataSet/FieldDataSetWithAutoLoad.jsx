import { PropTypes } from '@dhis2/prop-types'
import { hasValue } from '@dhis2/ui'
import React from 'react'
import { FieldDataSet } from './FieldDataSet.jsx'
import { useReadDataSetsQuery } from './useReadDataSetsQuery.js'

export const FieldDataSetWithAutoLoad = ({ required }) => {
    const { loading, error, data } = useReadDataSetsQuery()
    const validate = required ? hasValue : undefined

    if (loading) {
        return (
            <FieldDataSet
                loading
                showLoadingStatus
                required={required}
                dataSets={[]}
                validate={validate}
            />
        )
    }

    if (error) {
        return (
            <FieldDataSet
                required={required}
                disabled
                programs={[]}
                errorText={error.message}
                validate={validate}
            />
        )
    }

    const { dataSets } = data.dataSets
    const options = dataSets.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }))

    return (
        <FieldDataSet
            required={required}
            dataSets={options}
            validate={validate}
        />
    )
}

FieldDataSetWithAutoLoad.defaultProps = {
    required: false,
}

FieldDataSetWithAutoLoad.propTypes = {
    required: PropTypes.bool,
}
