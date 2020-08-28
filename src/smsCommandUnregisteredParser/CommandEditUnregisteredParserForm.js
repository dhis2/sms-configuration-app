import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import {
    ReactFinalForm,
    NoticeBox,
    CenteredContent,
    CircularLoader,
} from '@dhis2/ui'
import { useDataQuery } from '@dhis2/app-runtime'

import {
    FieldCommandConfirmMessage,
    FieldCommandName,
    FieldCommandParser,
} from '../smsCommandFields'
import {
    SaveCommandButton,
    SubmitErrors,
    useUpdateCommand,
} from '../smsCommand'
import { FieldUserGroup } from '../userGroup'
import { FormRow } from '../forms'
import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Form } = ReactFinalForm

const query = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ commandId }) => commandId,
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

export const CommandEditUnregisteredParserForm = ({
    commandId,
    onAfterChange,
}) => {
    const updateCommand = useUpdateCommand({
        commandId,
        onAfterChange,
        replace: true,
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
            {({ handleSubmit }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest(
                        'commands-commandunregisteredparserform'
                    )}
                >
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

                    <SubmitErrors />
                    <SaveCommandButton />
                </form>
            )}
        </Form>
    )
}

CommandEditUnregisteredParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
}
