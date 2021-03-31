import { PropTypes } from '@dhis2/prop-types'
import { Button, ButtonStrip, ReactFinalForm, CircularLoader } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import i18n from '../../../locales'
import {
    FormRow,
    PageHeadline,
    FieldUserGroupWithAutoLoad,
} from '../../../shared/components'
import { dataTest } from '../../../shared/utils'
import {
    FieldDataSetWithAutoLoad,
    FieldCommandName,
    FIELD_PARSER_NAME,
    FieldParser,
    FIELD_PROGRAM_NAME,
    FieldProgramWithAutoLoad,
    FIELD_PROGRAM_STAGE_NAME,
    FieldProgramStageWithLoadingStates,
    parserTypes,
    programTypes,
} from '../../components'
import { useCreateSmsCommandMutation } from '../../hooks'
import styles from './SmsCommandAdd.module.css'

const {
    ALL_PROGRAMS,
    PROGRAMS_WITH_REGISTRATION,
    PROGRAMS_WITHOUT_REGISTRATION,
} = programTypes

const { Form, useForm } = ReactFinalForm
const {
    ALERT_PARSER,
    EVENT_REGISTRATION_PARSER,
    J2ME_PARSER,
    KEY_VALUE_PARSER,
    PROGRAM_STAGE_DATAENTRY_PARSER,
    TRACKED_ENTITY_REGISTRATION_PARSER,
    UNREGISTERED_PARSER,
} = parserTypes

export const SMS_COMMAND_FORM_NEW_PATH = '/sms-config/new'

const useResetFormFields = () => {
    const form = useForm()
    const [prevValues, setPrevValues] = useState(form.getState().values)

    useEffect(
        () =>
            form.subscribe(
                ({ values }) => {
                    form.batch(() => {
                        const parserType = values[FIELD_PARSER_NAME]
                        const program = values[FIELD_PROGRAM_NAME]
                        const programStage = values[FIELD_PROGRAM_STAGE_NAME]
                        const prevProgram = prevValues[FIELD_PROGRAM_NAME]
                        const prevParserType = prevValues[FIELD_PARSER_NAME]

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
    const parserType = values[FIELD_PARSER_NAME]
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
                    <FieldParser />
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

export const SmsCommandAdd = () => {
    const history = useHistory()
    const [createSmsCommand] = useCreateSmsCommandMutation({
        onComplete: () => history.push('/sms-command'),
    })
    const onSubmit = values => createSmsCommand(values)

    return (
        <div data-test={dataTest('views-smscommandformnew')}>
            <Form destroyOnUnregister onSubmit={onSubmit}>
                {({ handleSubmit, submitting }) => (
                    <ActualForm
                        handleSubmit={handleSubmit}
                        submitting={submitting}
                    />
                )}
            </Form>
        </div>
    )
}
