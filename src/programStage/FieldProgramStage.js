import { SingleSelectFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FIELD_PROGRAM_STAGE_NAME = 'programStage'

export const FieldProgramStage = ({
    programStages,
    disabled,
    loading,
    initialValue,
    required,
    errorText,
}) => (
    <Field
        component={SingleSelectFieldFF}
        dataTest={dataTest('forms-fieldprogramstage')}
        disabled={disabled}
        error={!!errorText}
        format={value => value?.id || null}
        iinitialValue={initialValue}
        label={i18n.t('Program stage')}
        loading={loading}
        name={FIELD_PROGRAM_STAGE_NAME}
        options={programStages}
        parse={id => ({ id })}
        required={required}
        validate={required && hasValue}
        validationText={errorText}
    />
)

FieldProgramStage.defaultProps = {
    disabled: false,
    loading: false,
    required: false,
    errorText: '',
}

FieldProgramStage.propTypes = {
    programStages: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    disabled: PropTypes.bool,
    errorText: PropTypes.string,
    initialValue: PropTypes.string,
    loading: PropTypes.bool,
    required: PropTypes.bool,
}
