import { ButtonStrip, Button, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React, { useEffect, useState } from 'react'

import {
    ALERT_PARSER,
    EVENT_REGISTRATION_PARSER,
    FIELD_COMMAND_PARSER_NAME,
    J2ME_PARSER,
    KEY_VALUE_PARSER,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    TRACKED_ENTITY_REGISTRATION_PARSER,
    UNREGISTERED_PARSER,
    FieldCommandName,
    FieldCommandParser,
} from '../../smsCommandFields'
import { useCreateSmsCommandMutation } from '../../smsCommand'
import { FieldDataSetWithAutoLoad } from '../../dataSet'
import { FIELD_PROGRAM_NAME, FieldProgramWithAutoLoad } from '../../program'
import {
    FIELD_PROGRAM_STAGE_NAME,
    FieldProgramStageWithAutoLoad,
} from '../../programStage'
import { FieldUserGroupWithAutoLoad } from '../../userGroup'
import { FormRow } from '../../forms'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'

const { Form, useForm } = ReactFinalForm

export const SMS_COMMAND_FORM_NEW_PATH = '/sms-config/new'

const useResetFormFields = () => {
    const form = useForm()
    const [prevValues, setPrevValues] = useState(form.getState().values)

    useEffect(
        () =>
            form.subscribe(
                ({ values }) => {
                    form.batch(() => {
                        const parserType = values[FIELD_COMMAND_PARSER_NAME]
                        const program = values[FIELD_PROGRAM_NAME]
                        const programStage = values[FIELD_PROGRAM_STAGE_NAME]
                        const prevProgram = prevValues[FIELD_PROGRAM_NAME]
                        const prevParserType =
                            prevValues[FIELD_COMMAND_PARSER_NAME]

                        const programChanged =
                            prevProgram && program !== prevProgram

                        const parserTypeChanged =
                            prevParserType && parserType !== prevParserType

                        if (
                            // only unset program stage if one exists already
                            programStage &&
                            (programChanged || parserTypeChanged)
                        ) {
                            form.change(FIELD_PROGRAM_STAGE_NAME, null)
                        }
                    })

                    setPrevValues(values)
                },
                { values: true }
            ),
        [prevValues]
    )
}

const ActualForm = ({ handleSubmit, submitting }) => {
    // This is required to unset form fields that depend
    // on the selected value of a previous field
    useResetFormFields()

    const form = useForm()
    const { values } = form.getState()
    const parserType = values[FIELD_COMMAND_PARSER_NAME]
    const program = values[FIELD_PROGRAM_NAME]

    const showDataSetField =
        parserType === KEY_VALUE_PARSER.value ||
        parserType === J2ME_PARSER.value

    const showUserGroupField =
        parserType === ALERT_PARSER.value ||
        parserType === UNREGISTERED_PARSER.value

    const showProgramField =
        parserType === TRACKED_ENTITY_REGISTRATION_PARSER.value ||
        parserType === PROGRAM_STAGE_DATAENTRY_PARSER.value ||
        parserType === EVENT_REGISTRATION_PARSER.value

    const showProgramStageField =
        parserType === PROGRAM_STAGE_DATAENTRY_PARSER.value

    const registration =
        // undefined = all, false = program.programType --> WITHOUT_REGISTRATION
        parserType === EVENT_REGISTRATION_PARSER.value ? false : undefined

    return (
        <form onSubmit={handleSubmit}>
            <FormRow>
                <FieldCommandName />
            </FormRow>

            <FormRow>
                <FieldCommandParser />
            </FormRow>

            {showDataSetField && (
                <FormRow>
                    <FieldDataSetWithAutoLoad />
                </FormRow>
            )}

            {showUserGroupField && (
                <FormRow>
                    <FieldUserGroupWithAutoLoad />
                </FormRow>
            )}

            {showProgramField && (
                <FormRow>
                    <FieldProgramWithAutoLoad registration={registration} />
                </FormRow>
            )}

            {showProgramStageField && (
                <FormRow>
                    <FieldProgramStageWithAutoLoad programId={program || ''} />
                </FormRow>
            )}

            <ButtonStrip dataTest={dataTest('@TODO')}>
                <Button onClick={() => console.log('@TODO')} secondary>
                    {i18n.t('Cancel')}
                </Button>

                <Button primary type="submit">
                    {submitting
                        ? i18n.t('Submitting...')
                        : i18n.t('Add sms command')}
                </Button>
            </ButtonStrip>
        </form>
    )
}

ActualForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
}

export const SmsCommandFormNew = () => {
    const [createSmsCommand] = useCreateSmsCommandMutation()
    const onSubmit = values => createSmsCommand(values)

    return (
        <Form onSubmit={onSubmit}>
            {({ handleSubmit, submitting }) => (
                <ActualForm
                    handleSubmit={handleSubmit}
                    submitting={submitting}
                />
            )}
        </Form>
    )
}
