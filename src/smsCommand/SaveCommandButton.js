import { Button, CircularLoader, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../locales'

const { useFormState } = ReactFinalForm

const subscription = {
    submitting: true,
    pristine: true,
}

export const SaveCommandButton = () => {
    const { submitting, pristine } = useFormState({ subscription })

    return (
        <Button
            primary
            type="submit"
            disabled={pristine || submitting}
            icon={submitting ? <CircularLoader small /> : null}
        >
            {i18n.t('Save command')}
        </Button>
    )
}
