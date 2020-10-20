import { SingleSelectFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

// The "s" from "set" is not capitalized
// as the property on the java-model
// does not have a capitalized "s" either
//
// @TODO: Create issue to make it consistent
export const FIELD_DATA_SET_NAME = 'dataset'

export const FieldDataSet = ({
    dataSets,
    loading,
    required,
    disabled,
    errorText,
}) => (
    <Field
        disabled={disabled}
        error={!!errorText}
        validationText={errorText}
        required={required}
        loading={loading}
        dataTest={dataTest('forms-fielddataset')}
        name={FIELD_DATA_SET_NAME}
        label={i18n.t('Data set')}
        component={SingleSelectFieldFF}
        options={dataSets}
        validate={hasValue}
        format={value => value?.id || null}
        parse={id => ({ id })}
    />
)

FieldDataSet.defaultProps = {
    disabled: false,
    loading: false,
    required: false,
    errorText: '',
}

FieldDataSet.propTypes = {
    dataSets: PropTypes.arrayOf(
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
