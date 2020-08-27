import {
    Button,
    CenteredContent,
    CircularLoader,
    NoticeBox,
    ReactFinalForm,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { EVENT_REGISTRATION_PARSER } from './types'
import {
    FIELD_COMMAND_DEFAULT_MESSAGE_NAME,
    FIELD_COMMAND_ID_NAME,
    FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME,
    FIELD_COMMAND_NAME_NAME,
    FIELD_COMMAND_NO_USER_MESSAGE_NAME,
    FIELD_COMMAND_PARSER_NAME,
    FIELD_COMMAND_PROGAM_NAME,
    FIELD_COMMAND_PROGAM_STAGE_NAME,
    FIELD_COMMAND_SEPARATOR_NAME,
    FIELD_COMMAND_SMS_CODES_NAME,
    FIELD_COMMAND_SUCCESS_MESSAGE_NAME,
    FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME,
} from './fieldNames'
import { FormRow } from '../forms'
import { FieldCommandDefaultMessage } from './FieldCommandDefaultMessage'
import { FieldCommandMoreThanOneOrgUnitMessage } from './FieldCommandMoreThanOneOrgUnitMessage'
import { FieldCommandName } from './FieldCommandName'
import { FieldCommandNoUserMessage } from './FieldCommandNoUserMessage'
import { FieldCommandParser } from './FieldCommandParser'
import { FieldCommandSeparator } from './FieldCommandSeparator'
import { FieldCommandSuccessMessage } from './FieldCommandSuccessMessage'
import { FieldCommandWrongFormatMessage } from './FieldCommandWrongFormatMessage'
import { FieldProgram } from '../program'
import { FieldProgramStage } from '../programStage'
import { ProgramStageDataElements } from './ProgramStageDataElements'
import { useReadSmsCommandEventRegistrationParserQuery } from './useReadSmsCommandEventRegistrationParserQuery'
import { useUpdateSmsCommandMutation } from './useUpdateSmsCommandMutation'
import i18n from '../locales'

const { Form } = ReactFinalForm

const getInitialFormState = command => {
    const name = command[FIELD_COMMAND_NAME_NAME]
    const program = command[FIELD_COMMAND_PROGAM_NAME]
    const programStage = command[FIELD_COMMAND_PROGAM_STAGE_NAME]
    const separator = command[FIELD_COMMAND_SEPARATOR_NAME]
    const defaultMessage = command[FIELD_COMMAND_DEFAULT_MESSAGE_NAME]
    const wrongFormatMessage = command[FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME]
    const noUserMessage = command[FIELD_COMMAND_NO_USER_MESSAGE_NAME]
    const moreThanOneOrgUnitMessage =
        command[FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]
    const successMessage = command[FIELD_COMMAND_SUCCESS_MESSAGE_NAME]
    const smsCodes = command[FIELD_COMMAND_SMS_CODES_NAME].reduce(
        (curSmsCodes, smsCode) => ({
            ...curSmsCodes,
            [smsCode.dataElement.id]: smsCode,
        }),
        {}
    )

    return {
        [FIELD_COMMAND_NAME_NAME]: name,
        [FIELD_COMMAND_PARSER_NAME]: EVENT_REGISTRATION_PARSER.value,
        [FIELD_COMMAND_PROGAM_NAME]: program,
        [FIELD_COMMAND_PROGAM_STAGE_NAME]: programStage,
        [FIELD_COMMAND_SEPARATOR_NAME]: separator,
        [FIELD_COMMAND_DEFAULT_MESSAGE_NAME]: defaultMessage,
        [FIELD_COMMAND_WRONG_FORMAT_MESSAGE_NAME]: wrongFormatMessage,
        [FIELD_COMMAND_NO_USER_MESSAGE_NAME]: noUserMessage,
        [FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME]: moreThanOneOrgUnitMessage,
        [FIELD_COMMAND_SUCCESS_MESSAGE_NAME]: successMessage,
        [FIELD_COMMAND_SMS_CODES_NAME]: smsCodes,
    }
}

const onSubmitFactory = ({
    commandId,
    updateSmsCommand,
    onAfterChange,
}) => values => {
    const formSmsCodes = values[FIELD_COMMAND_SMS_CODES_NAME]
    const smsCodes = Object.values(formSmsCodes)

    const endpointPayload = {
        ...values,
        [FIELD_COMMAND_SMS_CODES_NAME]: smsCodes,
        [FIELD_COMMAND_ID_NAME]: commandId,
    }

    return updateSmsCommand(endpointPayload).then(response => {
        if (response.status !== 'OK') {
            throw new Error()
        }

        onAfterChange()
    })
}

export const CommandEditEventRegistrationParserForm = ({
    commandId,
    onAfterChange,
}) => {
    const {
        error,
        data: { smsCommand: command } = {},
    } = useReadSmsCommandEventRegistrationParserQuery(commandId)

    const [updateSmsCommand] = useUpdateSmsCommandMutation()

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
            initialValues={initialValues}
            onSubmit={onSubmitFactory({
                onAfterChange,
                updateSmsCommand,
                commandId,
            })}
        >
            {({ handleSubmit, pristine, submitting, values }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <FormRow>
                            <FieldCommandName />
                        </FormRow>

                        <FormRow>
                            <FieldCommandParser disabled />
                        </FormRow>

                        <FormRow>
                            <FieldProgram
                                disabled
                                programs={[selectedProgramOption]}
                            />
                        </FormRow>

                        <FormRow>
                            <FieldProgramStage
                                disabled
                                programStages={[selectedProgramStageOption]}
                            />
                        </FormRow>

                        <FormRow>
                            <FieldCommandSeparator />
                        </FormRow>

                        <FormRow>
                            <FieldCommandDefaultMessage />
                        </FormRow>

                        <FormRow>
                            <FieldCommandWrongFormatMessage />
                        </FormRow>

                        <FormRow>
                            <FieldCommandNoUserMessage />
                        </FormRow>

                        <FormRow>
                            <FieldCommandMoreThanOneOrgUnitMessage />
                        </FormRow>

                        <FormRow>
                            <FieldCommandSuccessMessage />
                        </FormRow>

                        {programStageDataElements && (
                            <FormRow>
                                <h2>{i18n.t('Program Stage Data Elements')}</h2>

                                <ProgramStageDataElements
                                    programStageDataElements={
                                        programStageDataElements
                                    }
                                    smsCodes={
                                        values[FIELD_COMMAND_SMS_CODES_NAME]
                                    }
                                />
                            </FormRow>
                        )}

                        <Button
                            type="submit"
                            disabled={pristine || submitting}
                            icon={submitting ? <CircularLoader small /> : null}
                        >
                            {i18n.t('Save sms command')}
                        </Button>
                    </form>
                )
            }}
        </Form>
    )
}

CommandEditEventRegistrationParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
}
