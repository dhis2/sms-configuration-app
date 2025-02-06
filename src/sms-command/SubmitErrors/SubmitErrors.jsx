import { NoticeBox, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { FormRow } from '../../shared/index.js'

const { useFormState } = ReactFinalForm
const subscription = {
    submitError: true,
    hasSubmitErrors: true,
}

export const SubmitErrors = () => {
    const { submitError, hasSubmitErrors } = useFormState({ subscription })

    if (!hasSubmitErrors) {
        return null
    }

    return (
        <FormRow>
            <NoticeBox
                error
                title={i18n.t(
                    'Something went wrong whilst submitting the form'
                )}
            >
                {submitError}
            </NoticeBox>
        </FormRow>
    )
}
