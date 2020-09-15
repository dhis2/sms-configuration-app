import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { useHistory } from 'react-router-dom'
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
import {
    ALL_PROGRAMS,
    FIELD_PROGRAM_NAME,
    PROGRAMS_WITH_REGISTRATION,
    PROGRAMS_WITHOUT_REGISTRATION,
    FieldProgramWithAutoLoad,
} from '../../program'
import {
    FIELD_PROGRAM_STAGE_NAME,
    FieldProgramStageWithLoadingStates,
} from '../../programStage'
import { FieldUserGroupWithAutoLoad } from '../../userGroup'
import { FormRow } from '../../forms'
import { PageHeadline } from '../../headline'
import i18n from '../../locales'
import { SMS_COMMAND_LIST_PATH } from './SmsCommandList'
import styles from './SmsCommandFormNew.module.css'

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

// undefined = all, false = program.programType --> WITHOUT_REGISTRATION
const shouldProgramsBeWithRegistration = parserType => {
    // EVENT_REGISTRATION uses event programs
    if (parserType === EVENT_REGISTRATION_PARSER.value) {
        return PROGRAMS_WITHOUT_REGISTRATION
    }

    // This is for programs of type tracker,
    // which can have multiple program stages
    if (parserType === PROGRAM_STAGE_DATAENTRY_PARSER.value) {
        return PROGRAMS_WITH_REGISTRATION
    }

    // Unrelated yet, but in case all program stages are need in the future
    return ALL_PROGRAMS
}

const ActualForm = ({ handleSubmit, submitting }) => {
    // This is required to unset form fields that depend
    // on the selected value of a previous field
    useResetFormFields()

    const history = useHistory()
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
        parserType === EVENT_REGISTRATION_PARSER.value ||
        parserType === PROGRAM_STAGE_DATAENTRY_PARSER.value

    const registration = shouldProgramsBeWithRegistration(parserType)
    const disableProgramStage = parserType === EVENT_REGISTRATION_PARSER.value

    return (
        <div className={styles.container}>
            <PageHeadline>{i18n.t('Add command')}</PageHeadline>
            <form onSubmit={handleSubmit}>
                <FormRow>
                    <FieldCommandName />
                </FormRow>

                <FormRow>
                    <FieldCommandParser />
                </FormRow>

                {showDataSetField && (
                    <FormRow>
                        <FieldDataSetWithAutoLoad required />
                    </FormRow>
                )}

                {showUserGroupField && (
                    <FormRow>
                        <FieldUserGroupWithAutoLoad required />
                    </FormRow>
                )}

                {showProgramField && (
                    <FormRow>
                        <FieldProgramWithAutoLoad
                            required
                            registration={registration}
                        />
                    </FormRow>
                )}

                {showProgramStageField && (
                    <FormRow>
                        <FieldProgramStageWithLoadingStates
                            disabled={disableProgramStage}
                            required
                            programId={program?.id || ''}
                            parserType={parserType}
                            helpText={
                                disableProgramStage
                                    ? i18n.t(
                                          'Automatically selected by selecting a program'
                                      )
                                    : undefined
                            }
                        />
                    </FormRow>
                )}

                <ButtonStrip>
                    <Button
                        primary
                        type="submit"
                        icon={submitting ? <CircularLoader small /> : null}
                        disabled={submitting}
                    >
                        {i18n.t('Add command')}
                    </Button>

                    <Button onClick={() => history.goBack()}>
                        {i18n.t('Cancel')}
                    </Button>
                </ButtonStrip>
            </form>
        </div>
    )
}

ActualForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
}

export const SmsCommandFormNew = () => {
    const history = useHistory()
    const [createSmsCommand] = useCreateSmsCommandMutation({
        onComplete: () => history.push(SMS_COMMAND_LIST_PATH),
    })
    const onSubmit = values => createSmsCommand(values)

    return (
        <Form destroyOnUnregister onSubmit={onSubmit}>
            {({ handleSubmit, submitting }) => (
                <ActualForm
                    handleSubmit={handleSubmit}
                    submitting={submitting}
                />
            )}
        </Form>
    )
}
