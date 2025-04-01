import { PropTypes } from '@dhis2/prop-types'
import {
    Button,
    CheckboxFieldFF,
    InputFieldFF,
    ReactFinalForm,
    composeValidators,
    hasValue,
    string,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest, useFeatureToggle } from '../../shared/index.js'
import styles from './FieldKeyValuePair.module.css'
import { ValueField } from './ValueField.jsx'

const { Field, useForm } = ReactFinalForm
const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const FieldKeyValuePair = ({ index, editMode }) => {
    const { change, getState } = useForm()
    const currentParameter = getState().values?.parameters?.[index]
    const { confidential: isConfidential, unsaved: isUnsaved } =
        currentParameter ?? {}
    const { disableConfidentialEdit } = useFeatureToggle()
    const isDisabled = disableConfidentialEdit && isConfidential && !isUnsaved

    const removeKeyValueFromFormState = (index) => {
        const { parameters } = getState().values

        if (index === 0) {
            change('parameters', parameters.slice(1))
        } else {
            change('parameters', [
                ...parameters.slice(0, index),
                ...parameters.slice(index + 1),
            ])
        }
    }

    return (
        <div
            className={styles.container}
            data-test={dataTest('smsgateway-fieldkeyvaluepair')}
        >
            {isDisabled && (
                <p>
                    {i18n.t(
                        'Saved confidential key value pairs can be deleted, but cannot be edited.'
                    )}
                </p>
            )}
            <div className={styles.textInputs}>
                <Field
                    dataTest={dataTest('smsgateway-fieldkeyvaluepair-key')}
                    className={styles.keyInput}
                    name={`parameters[${index}].key`}
                    label={i18n.t('Key')}
                    component={InputFieldFF}
                    validate={isStringWithLengthAtLeastOne}
                    disabled={isDisabled}
                />

                <div className={styles.valueInput}>
                    <ValueField
                        index={index}
                        editMode={editMode}
                        disabled={isDisabled}
                    />
                </div>
            </div>

            <div className={styles.checkboxGroup}>
                <Field
                    dataTest={dataTest('smsgateway-fieldkeyvaluepair-isheader')}
                    className={styles.checkbox}
                    type="checkbox"
                    name={`parameters[${index}].header`}
                    label={i18n.t('Send as header')}
                    component={CheckboxFieldFF}
                    disabled={isDisabled}
                />

                <Field
                    dataTest={dataTest(
                        'smsgateway-fieldkeyvaluepair-isencoded'
                    )}
                    className={styles.checkbox}
                    type="checkbox"
                    name={`parameters[${index}].encode`}
                    label={i18n.t('Encode')}
                    component={CheckboxFieldFF}
                    disabled={isDisabled}
                />

                <Field
                    dataTest={dataTest(
                        'smsgateway-fieldkeyvaluepair-isconfidential'
                    )}
                    className={styles.checkbox}
                    type="checkbox"
                    name={`parameters[${index}].confidential`}
                    label={i18n.t('Confidential')}
                    component={CheckboxFieldFF}
                    disabled={isDisabled}
                />
            </div>

            <Button
                small
                secondary
                dataTest={dataTest('smsgateway-fieldkeyvaluepair-remove')}
                onClick={() => removeKeyValueFromFormState(index)}
            >
                {i18n.t('Remove key value pair')}
            </Button>
        </div>
    )
}

FieldKeyValuePair.propTypes = {
    index: PropTypes.number.isRequired,
    editMode: PropTypes.bool,
}
