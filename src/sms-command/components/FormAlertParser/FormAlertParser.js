import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import {
    ContentLoading,
    ContentLoadingError,
    FormRow,
    FieldUserGroup,
} from '../../../shared/components'
import { dataTest } from '../../../shared/utils'
import { FieldCommandName } from '../FieldCommandName'
import { FieldConfirmMessage } from '../FieldConfirmMessage'
import { FieldParser } from '../FieldParser'
import { FormActions } from '../FormActions'
import { SubmitErrors } from '../SubmitErrors'
import { createInitialValues } from './createInitialValues'
import { createUserGroupOptions } from './createUserGroupOptions'
import { useAlertDataQuery } from './useAlertDataQuery'
import { useUpdateCommandMutation } from './useUpdateCommandMutation'

const { Form } = ReactFinalForm

export const FormAlertParser = ({ commandId, onAfterChange, onCancel }) => {
    const { loading, error, data } = useAlertDataQuery(commandId)
    const updateCommand = useUpdateCommandMutation({
        id: commandId,
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

    const initialValues = createInitialValues(data.smsCommand)
    const userGroups = createUserGroupOptions(data.smsCommand.userGroup)

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateCommand}
            initialValues={initialValues}
        >
            {({ handleSubmit, pristine }) => (
                <form
                    onSubmit={handleSubmit}
                    data-test={dataTest('commands-commandeditalertparserform')}
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

FormAlertParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
