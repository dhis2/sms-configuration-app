import {
    Button,
    Field as UiField,
    InputFieldFF,
    ReactFinalForm,
    hasValue,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FIELD_COMMAND_SPECIAL_CHARS_NAME } from './fieldNames'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import styles from './FieldCommandSpecialCharacter.module.css'

const { Field, useForm } = ReactFinalForm

export const FieldCommandSpecialCharacter = ({ index }) => {
    const { change, getState } = useForm()

    const removeSpecialKeyFieldsFromFormState = () => {
        const specialChars = getState().values[FIELD_COMMAND_SPECIAL_CHARS_NAME]
        const newSpecialChars = [
            ...specialChars.slice(0, index),
            ...specialChars.slice(index + 1),
        ]

        change(FIELD_COMMAND_SPECIAL_CHARS_NAME, newSpecialChars)
    }

    return (
        <div key={index} className={styles.container}>
            <Field
                required
                className={styles.field}
                dataTest={dataTest('@TODO')}
                label={i18n.t('Special character name')}
                name={`${FIELD_COMMAND_SPECIAL_CHARS_NAME}[${index}].name`}
                component={InputFieldFF}
                validate={hasValue}
            />

            <Field
                required
                className={styles.field}
                dataTest={dataTest('@TODO')}
                label={i18n.t('Special character value')}
                name={`${FIELD_COMMAND_SPECIAL_CHARS_NAME}[${index}].value`}
                component={InputFieldFF}
                validate={hasValue}
            />

            <UiField label="&nbsp;">
                <Button
                    className={styles.button}
                    onClick={removeSpecialKeyFieldsFromFormState}
                >
                    {i18n.t('Remove')}
                </Button>
            </UiField>
        </div>
    )
}

FieldCommandSpecialCharacter.propTypes = {
    index: PropTypes.number.isRequired,
}
