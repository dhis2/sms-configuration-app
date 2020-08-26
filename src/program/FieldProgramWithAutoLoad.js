import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FieldProgram } from './FieldProgram'
import { useReadProgramsQuery } from './useReadProgramsQuery'
import { useCriticalNotification } from '../notifications/useCriticalNotification'

export const FieldProgramWithAutoLoad = ({
    required,
    onlyWithRegistration,
}) => {
    const variables = { registration: onlyWithRegistration }
    const { loading, error, data } = useReadProgramsQuery({ variables })
    useCriticalNotification(error)

    if (loading) {
        return (
            <FieldProgram
                required={required}
                loading
                showLoadingStatus
                programs={[]}
            />
        )
    }

    if (error) {
        return <FieldProgram required={required} disabled programs={[]} />
    }

    const { programs } = data.programs
    const options = programs.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }))

    return <FieldProgram required={required} programs={options} />
}

FieldProgramWithAutoLoad.defaultProps = {
    required: false,
    onlyWithRegistration: true,
}

FieldProgramWithAutoLoad.propTypes = {
    onlyWithRegistration: PropTypes.bool,
    required: PropTypes.bool,
}
