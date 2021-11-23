import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { FormRow, dataTest } from '../../shared/index.js'
import { FIELD_SPECIAL_CHARS_NAME } from '../FieldSpecialCharacter/index.js'

const { useForm } = ReactFinalForm

export const AddSpecialCharacters = () => {
    const { change, getState } = useForm()

    const addSpecialKeyFieldsToFormState = () => {
        const specialChars = getState().values[FIELD_SPECIAL_CHARS_NAME]
        const newSpecialChars = [
            ...specialChars,
            {
                name: '',
                value: '',
            },
        ]

        change(FIELD_SPECIAL_CHARS_NAME, newSpecialChars)
    }

    return (
        <FormRow>
            <Button
                onClick={addSpecialKeyFieldsToFormState}
                dataTest={dataTest('smscommand-addspecialcharacter')}
            >
                {i18n.t('Add special character')}
            </Button>
        </FormRow>
    )
}
