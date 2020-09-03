import { NoticeBox, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import {
    ALL_DATAVALUE,
    AT_LEAST_ONE_DATAVALUE,
    FIELD_COMMAND_COMPLETENESS_METHOD_NAME,
} from '../smsCommandFields'
import { FormRow } from '../forms'
import i18n from '../locales'

const { useField } = ReactFinalForm

export const DataElementTimesCategoryOptionCombosCompletenessMessage = () => {
    const { input } = useField(FIELD_COMMAND_COMPLETENESS_METHOD_NAME, {
        subscription: { value: true },
    })

    const completenessMethod = input.value
    const title = i18n.t('Required values notice')

    if (completenessMethod === ALL_DATAVALUE.value) {
        return (
            <FormRow>
                <NoticeBox warning title={title}>
                    {i18n.t(
                        `All SMS short codes have to be provided for this sms command to work correctly when you have the completeness method "${ALL_DATAVALUE.label}" selected`
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
                        `At least one SMS short code has to be provided for this sms command to work correctly when you have the completeness method "${AT_LEAST_ONE_DATAVALUE.label}" selected`
                    )}
                </NoticeBox>
            </FormRow>
        )
    }

    return null
}
