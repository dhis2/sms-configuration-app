import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { FormRow, FieldUserGroup, dataTest } from '../../shared/index.js'
import { FieldCommandName } from '../FieldCommandName/index.js'
import { FieldConfirmMessage } from '../FieldConfirmMessage/index.js'
import { FieldParser } from '../FieldParser/index.js'
import { FormActions } from '../FormActions/index.js'
import { SubmitErrors } from '../SubmitErrors/index.js'

export const Form = ({ handleSubmit, userGroups, pristine, onCancel }) => (
    <form
        onSubmit={handleSubmit}
        data-test={dataTest('commands-commandunregisteredparserform')}
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
