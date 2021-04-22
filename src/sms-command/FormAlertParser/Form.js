import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { FormRow, FieldUserGroup, dataTest } from '../../shared'
import { FieldCommandName } from '../FieldCommandName'
import { FieldConfirmMessage } from '../FieldConfirmMessage'
import { FieldParser } from '../FieldParser'
import { FormActions } from '../FormActions'
import { SubmitErrors } from '../SubmitErrors'

export const Form = ({ userGroups, handleSubmit, pristine, onCancel }) => (
    <form
        onSubmit={handleSubmit}
        data-test={dataTest('smscommand-formalertparser-form')}
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
)

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    userGroups: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    onCancel: PropTypes.func.isRequired,
}
