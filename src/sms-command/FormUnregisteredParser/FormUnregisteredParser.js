import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { ContentLoading, ContentLoadingError } from '../../shared'
import { Form as FormComponent } from './Form'
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

    if (loading) {
        return <ContentLoading />
    }
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
                <FormComponent
                    handleSubmit={handleSubmit}
                    userGroups={userGroups}
                    pristine={pristine}
                    onCancel={onCancel}
                />
            )}
        </Form>
    )
}

FormUnregisteredParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
