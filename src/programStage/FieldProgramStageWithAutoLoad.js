import { hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React, { useEffect } from 'react'

import { FieldProgramStage } from './FieldProgramStage'
import { useReadProgramStagesQuery } from './useReadProgramStagesQuery'

export const FieldProgramStageWithAutoLoad = ({ required, programId }) => {
    const { loading, error, data, refetch } = useReadProgramStagesQuery({
        lazy: true,
    })
    const validate = required ? hasValue : undefined

    useEffect(() => {
        if (programId) refetch({ programId })
    }, [programId])

    if (loading) {
        return (
            <FieldProgramStage
                loading
                required={required}
                programStages={[]}
                validate={validate}
            />
        )
    }

    if (error) {
        return (
            <FieldProgramStage
                disabled
                errorText={error.message}
                required={required}
                programStages={[]}
                validate={validate}
            />
        )
    }

    if (!programId || !data) {
        return (
            <FieldProgramStage
                disabled
                required={required}
                programStages={[]}
                validate={validate}
            />
        )
    }

    const programStages = data?.programStages?.programStages || []
    const options = programStages.map(({ id, displayName }) => ({
        label: displayName,
        value: id,
    }))

    return <FieldProgramStage required={required} programStages={options} />
}

FieldProgramStageWithAutoLoad.defaultProps = {
    required: false,
}

FieldProgramStageWithAutoLoad.propTypes = {
    programId: PropTypes.string.isRequired,
    required: PropTypes.bool,
}
