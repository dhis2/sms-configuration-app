import { hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FieldProgram } from './FieldProgram'
import { useReadProgramsQuery } from './useReadProgramsQuery'

export const FieldProgramWithAutoLoad = ({ required, registration }) => {
    const variables = { registration }
    const { loading, error, data } = useReadProgramsQuery({ variables })
    const validate = required ? hasValue : undefined

    if (loading) {
        return (
            <FieldProgram
                required={required}
                loading
                showLoadingStatus
                programs={[]}
                validate={validate}
            />
        )
    }

    if (error) {
        return (
            <FieldProgram
                required={required}
                disabled
                programs={[]}
                errorText={error.message}
                validate={validate}
            />
        )
    }

    const { programs } = data.programs
    const options = programs.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }))

    return (
        <FieldProgram
            required={required}
            programs={options}
            validate={validate}
        />
    )
}

FieldProgramWithAutoLoad.defaultProps = {
    required: false,

    // undefined = both
    registration: undefined,
}

FieldProgramWithAutoLoad.propTypes = {
    registration: PropTypes.bool,
    required: PropTypes.bool,
}
