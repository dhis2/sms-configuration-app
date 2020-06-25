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
import { PropTypes } from '@dhis2/prop-types'

import { FormRow } from './FormRow'
import i18n from '../locales'
import styles from './KeyValuePair.module.css'

const { Field, useForm } = ReactFinalForm
const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const KeyValuePair = ({ index }) => {
    const { change, getState } = useForm()

    const removeKeyValueFromFormState = index => {
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
        <FormRow>
            <div className={styles.textInputs}>
                <Field
                    className={styles.keyInput}
                    name={`parameters[${index}].key`}
                    label={i18n.t('Key')}
                    component={InputFieldFF}
                    validate={isStringWithLengthAtLeastOne}
                />

                <Field
                    className={styles.valueInput}
                    name={`parameters[${index}].value`}
                    label={i18n.t('Value')}
                    component={InputFieldFF}
                    validate={isStringWithLengthAtLeastOne}
                />
            </div>

            <div className={styles.checkboxGroup}>
                <Field
                    className={styles.checkbox}
                    type="checkbox"
                    name={`parameters[${index}].header`}
                    label={i18n.t('Is header')}
                    component={CheckboxFieldFF}
                />

                <Field
                    className={styles.checkbox}
                    type="checkbox"
                    name={`parameters[${index}].encode`}
                    label={i18n.t('Encode')}
                    component={CheckboxFieldFF}
                />

                <Field
                    className={styles.checkbox}
                    type="checkbox"
                    name={`parameters[${index}].confidential`}
                    label={i18n.t('Confidential')}
                    component={CheckboxFieldFF}
                />
            </div>

            <Button onClick={() => removeKeyValueFromFormState(index)}>
                {i18n.t('Remove key value pair')}
            </Button>
        </FormRow>
    )
}

KeyValuePair.propTypes = {
    index: PropTypes.number.isRequired,
}
