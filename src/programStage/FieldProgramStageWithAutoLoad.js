import { PropTypes } from '@dhis2/prop-types'
import React, { useEffect } from 'react'

import { FieldProgramStage } from './FieldProgramStage'
import { useReadProgramStagesQuery } from './useReadProgramStagesQuery'
import { useCriticalNotification } from '../notifications/useCriticalNotification'

export const FieldProgramStageWithAutoLoad = ({ required, programId }) => {
    const { loading, error, data, refetch } = useReadProgramStagesQuery({
        lazy: true,
    })

    useCriticalNotification(error)

    useEffect(() => {
        if (programId) refetch({ programId })
    }, [programId])

    if (loading) {
        return (
            <FieldProgramStage loading required={required} programStages={[]} />
        )
    }

    if (error) {
        return (
            <FieldProgramStage
                disabled
                required={required}
                programStages={[]}
            />
        )
    }

    if (!programId || !data) {
        return (
            <FieldProgramStage
                disabled
                required={required}
                programStages={[]}
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
