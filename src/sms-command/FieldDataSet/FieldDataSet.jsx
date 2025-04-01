import { PropTypes } from '@dhis2/prop-types'
import { SingleSelectFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

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
        dataTest={dataTest('smscommand-fielddataset')}
        name={FIELD_DATA_SET_NAME}
        label={i18n.t('Data set')}
        component={SingleSelectFieldFF}
        options={dataSets}
        validate={hasValue}
        format={(value) => value?.id || null}
        parse={(id) => ({ id })}
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
