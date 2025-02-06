import { PropTypes } from '@dhis2/prop-types'
import {
    Button,
    Field as UiField,
    InputFieldFF,
    ReactFinalForm,
    hasValue,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import styles from './FieldSpecialCharacter.module.css'

const { Field, useForm } = ReactFinalForm

export const FIELD_SPECIAL_CHARS_NAME = 'specialCharacters'

export const FieldSpecialCharacter = ({ index, onSpecialKeyRemoved }) => {
    const { change, getState } = useForm()

    const removeSpecialKeyFieldsFromFormState = () => {
        const specialChars = getState().values[FIELD_SPECIAL_CHARS_NAME]
        const newSpecialChars = [
            ...specialChars.slice(0, index),
            ...specialChars.slice(index + 1),
        ]

        change(FIELD_SPECIAL_CHARS_NAME, newSpecialChars)
        onSpecialKeyRemoved()
    }

    return (
        <div key={index} className={styles.container}>
            <Field
                required
                className={styles.field}
                dataTest={dataTest('smscommand-fieldspecialcharacter-name')}
                label={i18n.t('Special character name')}
                name={`${FIELD_SPECIAL_CHARS_NAME}[${index}].name`}
                component={InputFieldFF}
                validate={hasValue}
            />

            <Field
                required
                className={styles.field}
                dataTest={dataTest('smscommand-fieldspecialcharacter-value')}
                label={i18n.t('Special character value')}
                name={`${FIELD_SPECIAL_CHARS_NAME}[${index}].value`}
                component={InputFieldFF}
                validate={hasValue}
            />

            <UiField label="&nbsp;">
                <Button
                    className={styles.button}
                    onClick={removeSpecialKeyFieldsFromFormState}
                    dataTest={dataTest(
                        'smscommand-fieldspecialcharacter-remove'
                    )}
                >
                    {i18n.t('Remove')}
                </Button>
            </UiField>
        </div>
    )
}

FieldSpecialCharacter.propTypes = {
    index: PropTypes.number.isRequired,
    onSpecialKeyRemoved: PropTypes.func.isRequired,
}
