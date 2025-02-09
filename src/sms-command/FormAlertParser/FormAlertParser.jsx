import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { ContentLoading, ContentLoadingError } from '../../shared/index.js'
import { createInitialValues } from './createInitialValues.js'
import { createUserGroupOptions } from './createUserGroupOptions.js'
import { Form as FormComponent } from './Form.jsx'
import { useAlertDataQuery } from './useAlertDataQuery.js'
import { useUpdateCommandMutation } from './useUpdateCommandMutation.js'

const { Form } = ReactFinalForm

export const FormAlertParser = ({ commandId, onAfterChange, onCancel }) => {
    const { loading, error, data } = useAlertDataQuery(commandId)
    const updateCommand = useUpdateCommandMutation({
        id: commandId,
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

    const initialValues = createInitialValues(data.smsCommand)
    const userGroups = createUserGroupOptions(data.smsCommand.userGroup)

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateCommand}
            initialValues={initialValues}
        >
            {({ handleSubmit, pristine }) => (
                <FormComponent
                    userGroups={userGroups}
                    handleSubmit={handleSubmit}
                    pristine={pristine}
                    onCancel={onCancel}
                />
            )}
        </Form>
    )
}

FormAlertParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
