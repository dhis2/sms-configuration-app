import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { FormRow, FieldUserGroup } from '../../../shared/components'
import { ContentLoading } from '../../../shared/components/ContentLoading'
import { ContentLoadingError } from '../../../shared/components/ContentLoadingError'
import { dataTest } from '../../../shared/utils'
import { FieldCommandName } from '../FieldCommandName'
import { FieldConfirmMessage } from '../FieldConfirmMessage'
import { FieldParser } from '../FieldParser'
import { FormActions } from '../FormActions'
import { SubmitErrors } from '../SubmitErrors'
import { useCommandData } from './useCommandData'
import { useUpdateCommandMutation } from './useUpdateCommandMutation'

const { Form } = ReactFinalForm

export const FormUnregisteredParser = ({
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
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateCommand}
            initialValues={initialValues}
        >
            {({ handleSubmit, pristine }) => (
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
                        <FieldParser disabled />
                    </FormRow>

                    <FormRow>
                        <FieldUserGroup disabled userGroups={userGroups} />
                    </FormRow>

                    <FormRow>
                        <FieldConfirmMessage />
                    </FormRow>

                    <SubmitErrors />
                    <FormActions onCancel={() => onCancel(pristine)} />
                </form>
            )}
        </Form>
    )
}

FormUnregisteredParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
