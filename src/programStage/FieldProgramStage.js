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
    required,
    errorText,
}) => (
    <Field
        disabled={disabled}
        error={!!errorText}
        validationText={errorText}
        required={required}
        loading={loading}
        dataTest={dataTest('forms-fieldprogramStage')}
        name={FIELD_PROGRAM_STAGE_NAME}
        label={i18n.t('Program stage')}
        component={SingleSelectFieldFF}
        options={programStages}
        validate={required && hasValue}
        format={value => value?.id || null}
        parse={id => ({ id })}
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
    loading: PropTypes.bool,
    required: PropTypes.bool,
}
