import { SingleSelectFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FIELD_PROGRAM_NAME = 'program'

export const FieldProgram = ({
    programs,
    loading,
    required,
    disabled,
    errorText,
}) => (
    <Field
        error={!!errorText}
        validationText={errorText}
        disabled={disabled}
        required={required}
        loading={loading}
        dataTest={dataTest('forms-fieldprogram')}
        name={FIELD_PROGRAM_NAME}
        label={i18n.t('Program')}
        component={SingleSelectFieldFF}
        options={programs}
        validate={required && hasValue}
        format={value => value?.id || null}
        parse={id => ({ id })}
    />
)

FieldProgram.defaultProps = {
    disabled: false,
    errorText: '',
    loading: false,
    required: false,
}

FieldProgram.propTypes = {
    programs: PropTypes.arrayOf(
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
