import {
    CenteredContent,
    CircularLoader,
    NoticeBox,
    ReactFinalForm,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import {
    FIELD_COMMAND_DEFAULT_MESSAGE_NAME,
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
    FieldCommandDefaultMessage,
    FieldCommandMoreThanOneOrgUnitMessage,
    FieldCommandName,
    FieldCommandNoUserMessage,
    FieldCommandParser,
    FieldCommandSeparator,
    FieldCommandSuccessMessage,
    FieldCommandWrongFormatMessage,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    ProgramStageDataElements,
} from '../smsCommandFields'
import {
    SaveCommandButton,
    SubmitErrors,
    useUpdateCommand,
} from '../smsCommand'
import { FieldProgram } from '../program'
import { FieldProgramStage } from '../programStage'
import { FormRow } from '../forms'
import { dataTest } from '../dataTest'
import { useReadSmsCommandProgramStageDataEntryParserQuery } from './useReadSmsCommandProgramStageDataEntryParserQuery'
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
        [FIELD_COMMAND_PARSER_NAME]: PROGRAM_STAGE_DATAENTRY_PARSER.value,
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

const formatSmsCodes = updates => ({
    ...updates,
    [FIELD_COMMAND_SMS_CODES_NAME]: Object.values(
        updates[FIELD_COMMAND_SMS_CODES_NAME]
    ),
})

export const CommandEditProgramStageDataEntryParserForm = ({
    commandId,
    onAfterChange,
}) => {
    const {
        error: loadingCommandError,
        data: commandData,
    } = useReadSmsCommandProgramStageDataEntryParserQuery(commandId)

    const command = commandData?.smsCommand
    const programStageDataElements =
        command?.programStage.programStageDataElements

    const updateCommand = useUpdateCommand({
        commandId,
        onAfterChange,
        formatCommand: formatSmsCodes,
    })

    if (loadingCommandError) {
        const msg = i18n.t(
            "Something went wrong whilst loading the command's details"
        )

        return (
            <NoticeBox error title={msg}>
                {loadingCommandError.message}
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
        <Form onSubmit={updateCommand} initialValues={initialValues}>
            {({ handleSubmit, values }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest(
                        'commands-commandeditprogramstagedataentryparserform'
                    )}
                >
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
                                smsCodes={values[FIELD_COMMAND_SMS_CODES_NAME]}
                            />
                        </FormRow>
                    )}

                    <SubmitErrors />
                    <SaveCommandButton />
                </form>
            )}
        </Form>
    )
}

CommandEditProgramStageDataEntryParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
}
