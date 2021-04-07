import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { ContentLoading, ContentLoadingError } from '../../shared'
import { FormComponent } from './FormComponent'
import { getInitialFormState } from './getInitialFormState'
import { useCommandData } from './useCommandData'
import { useUpdateCommandMutation } from './useUpdateCommandMutation'

const { Form } = ReactFinalForm

export const FormProgramStageDataEntryParser = ({
    commandId,
    onAfterChange,
    onCancel,
}) => {
    const { loading, error, data } = useCommandData(commandId)

    const updateCommand = useUpdateCommandMutation({
        commandId,
        onAfterChange,
    })

    if (loading) return <ContentLoading />
    if (error) {
        return (
            <ContentLoadingError
                errorMessage={error.message}
                title={i18n.t(
                    'Something went wrong whilst loading the sms command'
                )}
            />
        )
    }

    const command = data?.smsCommand
    const programStageDataElements =
        command?.programStage.programStageDataElements

    const initialValues = getInitialFormState(command)

    const selectedProgramOption = {
        value: command.program.id,
        label: command.program.displayName,
    }

    const selectedProgramStageOption = {
        value: command.programStage.id,
        label: command.programStage.displayName,
    }

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateCommand}
            initialValues={initialValues}
        >
            {({ handleSubmit }) => (
                <FormComponent
                    handleSubmit={handleSubmit}
                    selectedProgramOption={selectedProgramOption}
                    programStageDataElements={programStageDataElements}
                    selectedProgramStageOption={selectedProgramStageOption}
                    onCancel={onCancel}
                />
            )}
        </Form>
    )
}

FormProgramStageDataEntryParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
