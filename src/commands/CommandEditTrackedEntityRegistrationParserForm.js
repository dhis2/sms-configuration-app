import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {
    Button,
    ReactFinalForm,
    FinalForm,
    NoticeBox,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import { useDataQuery, useDataEngine } from '@dhis2/app-runtime'

import { AlertContext } from '../notifications'
import i18n from '../locales'
import { FormRow } from '../forms'
import { FieldCommandName } from './FieldCommandName'
import { FieldCommandParser } from './FieldCommandParser'
import { FieldProgram } from '../program'

const { Form } = ReactFinalForm
const { FORM_ERROR } = FinalForm

const query = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ commandId }) => commandId,
        params: {
            fields: [
                'name',
                'parserType',
                'separator',
                // Reply message if no codes are sent
                'defaultMessage',
                'wrongFormatMessage',
                'noUserMessage',
                'moreThanOneOrgUnitMessage',
                // Success message
                'receivedMessage',
                // I'm pretty sure this is where the values for these attribute fields go
                // You can also get the trackedEntityAttributes here, but as you can see
                // the order is all wrong... So I'm not sure if you want to perhaps get
                // rid of the `displayName` here...
                'smsCodes[:all,trackedEntityAttribute[id,displayName]]',
                // Here you can get the program name, and the trackedEntityAttributes in
                // the correct order
                'program[id,displayName,programTrackedEntityAttributes[trackedEntityAttribute[id,displayName]]]',
            ],
        },
    },
}

const mutation = {
    resource: 'smsCommands',
    type: 'update',
    partial: true,
    id: ({ commandId }) => commandId,
    data: ({ command }) => command,
}

export const CommandEditTrackedEntityRegistrationParserForm = ({
    commandId,
    onAfterChange,
}) => {
    const { addAlert } = useContext(AlertContext)
    const engine = useDataEngine()
    const updateCommand = command =>
        engine
            .mutate(mutation, { variables: { command, commandId } })
            .then(onAfterChange)
            .catch(error => {
                const isValidationError = error.type === 'access'

                // Potential validation error, return it in a format final-form can handle
                if (isValidationError) {
                    const fallback = 'No error message was provided'
                    const message = error.message || i18n.t(fallback)

                    return {
                        [FORM_ERROR]: message,
                    }
                }

                // Notify on unexpected errors
                addAlert({ type: 'critical', message: error.message })
            })

    const { loading, error, data } = useDataQuery(query, {
        variables: { commandId },
    })

    if (loading) {
        return (
            <CenteredContent>
                <CircularLoader />
            </CenteredContent>
        )
    }

    if (error) {
        const msg = i18n.t(
            'Something went wrong whilst loading the sms command'
        )

        return (
            <NoticeBox error title={msg}>
                {error.message}
            </NoticeBox>
        )
    }

    console.log(data)
    const { name, parserType, program } = data.smsCommand
    const initialValues = {
        name,
        parserType,
        program,
    }
    const selectedProgramOption = {
        value: program.id,
        label: program.displayName,
    }

    return (
        <Form onSubmit={updateCommand} initialValues={initialValues}>
            {({
                handleSubmit,
                submitting,
                pristine,
                submitError,
                hasSubmitErrors,
            }) => (
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

                    {hasSubmitErrors && (
                        <FormRow>
                            <NoticeBox
                                error
                                title={i18n.t(
                                    'Something went wrong whilst submitting the form'
                                )}
                            >
                                {submitError}
                            </NoticeBox>
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
            )}
        </Form>
    )
}

CommandEditTrackedEntityRegistrationParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
}
