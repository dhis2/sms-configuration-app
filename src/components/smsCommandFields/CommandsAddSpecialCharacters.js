import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales'
import { dataTest } from '../../utils'
import { FormRow } from '../forms'
import { FIELD_COMMAND_SPECIAL_CHARS_NAME } from './fieldNames'

const { useForm } = ReactFinalForm

export const CommandsAddSpecialCharacters = () => {
    const { change, getState } = useForm()

    const addSpecialKeyFieldsToFormState = () => {
        const specialChars = getState().values[FIELD_COMMAND_SPECIAL_CHARS_NAME]
        const newSpecialChars = [
            ...specialChars,
            {
                name: '',
                value: '',
            },
        ]

        change(FIELD_COMMAND_SPECIAL_CHARS_NAME, newSpecialChars)
    }

    return (
        <FormRow>
            <Button
                onClick={addSpecialKeyFieldsToFormState}
                dataTest={dataTest('forms-commandsaddspecialcharacters')}
            >
                {i18n.t('Add special character')}
            </Button>
        </FormRow>
    )
}
