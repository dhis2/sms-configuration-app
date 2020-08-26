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
import { useHistory } from 'react-router'

import { SMS_COMMAND_LIST_PATH } from '../views'
import { AlertContext } from '../notifications'
import i18n from '../locales'
import { FormRow } from '../forms'
import { FieldCommandName } from './FieldCommandName'
import { FieldCommandParser } from './FieldCommandParser'
import { FieldCommandConfirmMessage } from './FieldCommandConfirmMessage'
import { FieldUserGroup } from '../userGroup'

const { Form } = ReactFinalForm
const { FORM_ERROR } = FinalForm

const query = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: [
                'name',
                'parserType',
                'receivedMessage',
                'userGroup[name,id]',
            ],
        },
    },
}

const mutation = {
    resource: 'smsCommands',
    type: 'update',
    partial: true,
    id: ({ id }) => id,
    data: ({ command }) => command,
}

export const CommandEditAlertParserForm = ({ id }) => {
    const { addAlert } = useContext(AlertContext)
    const history = useHistory()
    const engine = useDataEngine()
    const updateCommand = command =>
        engine
            .mutate(mutation, { variables: { command, id } })
            .then(() => {
                history.push(SMS_COMMAND_LIST_PATH)
            })
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

    const { loading, error, data } = useDataQuery(query, { variables: { id } })

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

    const { name, parserType, receivedMessage, userGroup } = data.smsCommand
    const initialValues = {
        name,
        parserType,
        receivedMessage,
        userGroup: userGroup.id,
    }
    const userGroups = [
        {
            value: userGroup.id,
            label: userGroup.name,
        },
    ]

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
                        <FieldUserGroup disabled userGroups={userGroups} />
                    </FormRow>
                    <FormRow>
                        <FieldCommandConfirmMessage />
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

CommandEditAlertParserForm.propTypes = {
    id: PropTypes.string.isRequired,
}
