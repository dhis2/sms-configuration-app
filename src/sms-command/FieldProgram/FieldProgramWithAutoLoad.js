import { PropTypes } from '@dhis2/prop-types'
import { hasValue, ReactFinalForm } from '@dhis2/ui'
import React, { useEffect } from 'react'
import { FIELD_PROGRAM_NAME, FieldProgram } from './FieldProgram.js'
import { programTypes } from './programTypes.js'
import { useReadProgramsQuery } from './useReadProgramsQuery.js'

const { ALL_PROGRAMS } = programTypes
const { useForm } = ReactFinalForm

export const FieldProgramWithAutoLoad = ({ required, registration }) => {
    const form = useForm()
    const validate = required ? hasValue : undefined
    const { loading, error, data, refetch } = useReadProgramsQuery({
        lazy: true,
    })

    useEffect(() => {
        const variables = { registration }
        form.change(FIELD_PROGRAM_NAME, null)
        refetch(variables)
    }, [registration])

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
    registration: ALL_PROGRAMS,
}

FieldProgramWithAutoLoad.propTypes = {
    registration: PropTypes.string,
    required: PropTypes.bool,
}
