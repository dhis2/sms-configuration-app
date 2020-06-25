import { Button, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../locales'

const { useForm } = ReactFinalForm

export const AddKeyValuePair = () => {
    const { change, getState } = useForm()

    const addKeyValueToFormState = () => {
        const { parameters } = getState().values

        change('parameters', [
            ...parameters,
            {
                header: false,
                encode: false,
                key: '',
                value: '',
                confidential: false,
            },
        ])
    }

    return (
        <Button onClick={addKeyValueToFormState}>
            {i18n.t('Add key value pair')}
        </Button>
    )
}
