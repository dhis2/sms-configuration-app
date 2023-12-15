import { NoticeBox, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { FormRow } from '../../shared/index.js'
import {
    FIELD_COMPLETENESS_METHOD_NAME,
    completenessMethods,
} from '../FieldCompletenessMethod/index.js'

const { ALL_DATAVALUE, AT_LEAST_ONE_DATAVALUE } = completenessMethods
const { useField } = ReactFinalForm

export const CompletenessMessage = () => {
    const { input } = useField(FIELD_COMPLETENESS_METHOD_NAME, {
        subscription: { value: true },
    })

    const completenessMethod = input.value
    const title = i18n.t('Required values notice')

    if (completenessMethod === ALL_DATAVALUE.value) {
        return (
            <FormRow>
                <NoticeBox warning title={title}>
                    {i18n.t(
                        `Make sure all SMS short codes are provided when completeness method "${ALL_DATAVALUE.label}" is chosen, otherwise received messages will not be processed.`
                    )}
                </NoticeBox>
            </FormRow>
        )
    }

    if (completenessMethod === AT_LEAST_ONE_DATAVALUE.value) {
        return (
            <FormRow>
                <NoticeBox warning title={title}>
                    {i18n.t(
                        `Make sure at least one SMS short code is provided when completeness method "{{atLeastOneDataValueLabel}}" is chosen, otherwise received messages will not be processed.`,
                        {
                            atLeastOneDataValueLabel:
                                AT_LEAST_ONE_DATAVALUE.label,
                        }
                    )}
                </NoticeBox>
            </FormRow>
        )
    }

    return null
}
