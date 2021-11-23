import { PropTypes } from '@dhis2/prop-types'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { ContentLoading, ContentLoadingError } from '../../shared/index.js'
import { Form as FormComponent } from './Form.js'
import { useCommandData } from './useCommandData.js'
import { useUpdateCommandMutation } from './useUpdateCommandMutation.js'

const { Form } = ReactFinalForm

export const FormTrackedEntityRegistrationParser = ({
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

    const {
        name,
        parserType,
        program,
        separator,
        defaultMessage,
        wrongFormatMessage,
        noUserMessage,
        moreThanOneOrgUnitMessage,
        successMessage,
        smsCodes: smsCodesOriginal,
    } = data.smsCommand

    const smsCodes = smsCodesOriginal.reduce(
        (curSmsCodes, smsCode) => ({
            ...curSmsCodes,
            [smsCode.trackedEntityAttribute.id]: smsCode,
        }),
        {}
    )

    const initialValues = {
        name,
        parserType,
        program,
        separator,
        defaultMessage,
        wrongFormatMessage,
        noUserMessage,
        moreThanOneOrgUnitMessage,
        successMessage,
        smsCodes,
    }
    const selectedProgramOption = {
        value: program.id,
        label: program.displayName,
    }

    /**
     * Create usable data for the dynamic fields
     */

    // The tracked entity attributes here have the right order for the fields
    const trackedEntityAttributes = program.programTrackedEntityAttributes.map(
        ({ trackedEntityAttribute }) => trackedEntityAttribute
    )

    // Creating an array with only the data we need to render our dynamic form fields
    const dynamicFields = trackedEntityAttributes.map(
        (trackedEntityAttribute) => {
            const { id, displayName, valueType } = trackedEntityAttribute
            const merged = { id, displayName, valueType }
            const smsCode = smsCodes[id]

            if (smsCode) {
                // This contains the actual value of the field
                merged.initialValue = smsCode.code
            }

            return merged
        }
    )

    return (
        <Form
            keepDirtyOnReinitialize
            onSubmit={updateCommand}
            initialValues={initialValues}
        >
            {({ handleSubmit }) => (
                <FormComponent
                    dynamicFields={dynamicFields}
                    handleSubmit={handleSubmit}
                    selectedProgramOption={selectedProgramOption}
                    onCancel={onCancel}
                />
            )}
        </Form>
    )
}

FormTrackedEntityRegistrationParser.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
