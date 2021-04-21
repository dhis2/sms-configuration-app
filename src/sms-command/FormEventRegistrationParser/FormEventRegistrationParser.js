import { PropTypes } from '@dhis2/prop-types'
import {
    CenteredContent,
    CircularLoader,
    NoticeBox,
    ReactFinalForm,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { Form as FormComponent } from './Form'
import { getInitialFormState } from './getInitialFormState'
import { useCommandQuery } from './useCommandQuery'
import { useUpdateCommandMutation } from './useUpdateCommandMutation'

const { Form } = ReactFinalForm

export const FormEventRegistrationParser = ({
    commandId,
    onAfterChange,
    onCancel,
}) => {
    const { error, data = {} } = useCommandQuery(commandId)
    const { smsCommand: command } = data

    const updateCommand = useUpdateCommandMutation({
        id: commandId,
        onAfterChange,
    })

    if (error) {
        const msg = i18n.t(
            "Something went wrong whilst loading the command's details"
        )

        return (
            <NoticeBox error title={msg}>
                {error.message}
            </NoticeBox>
        )
    }

    if (!command) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    const selectedProgramOption = {
        value: command.program.id,
        label: command.program.displayName,
    }

    const selectedProgramStageOption = {
        value: command.programStage.id,
        label: command.programStage.displayName,
    }

    const programStageDataElements =
        command.programStage.programStageDataElements

    const initialValues = getInitialFormState(command)

    return (
        <Form
            keepDirtyOnReinitialize
            initialValues={initialValues}
            onSubmit={updateCommand}
        >
            {({ handleSubmit }) => {
                return (
                    <FormComponent
                        handleSubmit={handleSubmit}
                        selectedProgramOption={selectedProgramOption}
                        selectedProgramStageOption={selectedProgramStageOption}
                        programStageDataElements={programStageDataElements}
                        onCancel={onCancel}
                    />
                )
            }}
        </Form>
    )
}

FormEventRegistrationParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
