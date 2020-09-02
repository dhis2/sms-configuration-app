import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FieldDataSet } from './FieldDataSet'
import { useReadDataSetsQuery } from './useReadDataSetsQuery'

export const FieldDataSetWithAutoLoad = ({ required }) => {
    const { loading, error, data } = useReadDataSetsQuery()

    if (loading) {
        return (
            <FieldDataSet
                loading
                showLoadingStatus
                required={required}
                dataSets={[]}
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
            />
        )
    }

    const { dataSets } = data.dataSets
    const options = dataSets.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }))

    return <FieldDataSet required={required} dataSets={options} />
}

FieldDataSetWithAutoLoad.defaultProps = {
    required: false,
}

FieldDataSetWithAutoLoad.propTypes = {
    required: PropTypes.bool,
}
