import { PropTypes } from '@dhis2/prop-types'
import { hasValue, ReactFinalForm } from '@dhis2/ui'
import React, { useEffect } from 'react'
import { EVENT_REGISTRATION_PARSER } from '../smsCommandFields'
import {
    FIELD_PROGRAM_STAGE_NAME,
    FieldProgramStage,
} from './FieldProgramStage'
import { useReadProgramStagesQuery } from './useReadProgramStagesQuery'

const { useForm } = ReactFinalForm

export const FieldProgramStageWithLoadingStates = ({
    parserType,
    programId,
    disabled,
    required,
}) => {
    const form = useForm()
    const { loading, error, data, refetch } = useReadProgramStagesQuery({
        lazy: true,
    })
    const validate = required ? hasValue : undefined

    useEffect(() => {
        if (programId) refetch({ programId })
    }, [programId])

    useEffect(() => {
        const isEventRegistrationParser =
            parserType === EVENT_REGISTRATION_PARSER.value

        const programStageValueForEventRegistration = {
            id: data?.programStages?.programStages[0]?.id,
        }

        const initialValue = isEventRegistrationParser
            ? programStageValueForEventRegistration
            : undefined

        form.change(FIELD_PROGRAM_STAGE_NAME, initialValue)
    }, [parserType, data?.programStages?.programStages])

    if (loading) {
        return (
            <FieldProgramStage
                loading
                disabled={disabled}
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

    return (
        <FieldProgramStage
            disabled={disabled}
            required={required}
            programStages={options}
        />
    )
}

FieldProgramStageWithLoadingStates.defaultProps = {
    disabled: false,
    required: false,
}

FieldProgramStageWithLoadingStates.propTypes = {
    parserType: PropTypes.string.isRequired,
    programId: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
}
