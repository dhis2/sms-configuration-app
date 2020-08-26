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

import { FormRow } from '../forms'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import styles from './GatewayKeyValuePair.module.css'

const { Field, useForm } = ReactFinalForm
const isStringWithLengthAtLeastOne = composeValidators(string, hasValue)

export const GatewayKeyValuePair = ({ index }) => {
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
        <div data-test={dataTest('gateways-gatewaykeyvaluepair')}>
            <FormRow>
                <div className={styles.textInputs}>
                    <Field
                        dataTest={dataTest('gateways-gatewaykeyvaluepair-key')}
                        className={styles.keyInput}
                        name={`parameters[${index}].key`}
                        label={i18n.t('Key')}
                        component={InputFieldFF}
                        validate={isStringWithLengthAtLeastOne}
                    />

                    <Field
                        dataTest={dataTest(
                            'gateways-gatewaykeyvaluepair-value'
                        )}
                        className={styles.valueInput}
                        name={`parameters[${index}].value`}
                        label={i18n.t('Value')}
                        component={InputFieldFF}
                        validate={isStringWithLengthAtLeastOne}
                    />
                </div>

                <div className={styles.checkboxGroup}>
                    <Field
                        dataTest={dataTest(
                            'gateways-gatewaykeyvaluepair-isheader'
                        )}
                        className={styles.checkbox}
                        type="checkbox"
                        name={`parameters[${index}].header`}
                        label={i18n.t('Is header')}
                        component={CheckboxFieldFF}
                    />

                    <Field
                        dataTest={dataTest(
                            'gateways-gatewaykeyvaluepair-isencoded'
                        )}
                        className={styles.checkbox}
                        type="checkbox"
                        name={`parameters[${index}].encode`}
                        label={i18n.t('Encode')}
                        component={CheckboxFieldFF}
                    />

                    <Field
                        dataTest={dataTest(
                            'gateways-gatewaykeyvaluepair-isconfidential'
                        )}
                        className={styles.checkbox}
                        type="checkbox"
                        name={`parameters[${index}].confidential`}
                        label={i18n.t('Confidential')}
                        component={CheckboxFieldFF}
                    />
                </div>

                <Button
                    dataTest={dataTest('gateways-gatewaykeyvaluepair-remove')}
                    onClick={() => removeKeyValueFromFormState(index)}
                >
                    {i18n.t('Remove key value pair')}
                </Button>
            </FormRow>
        </div>
    )
}

GatewayKeyValuePair.propTypes = {
    index: PropTypes.number.isRequired,
}
