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
                        `Make sure at least one SMS short code is provided when completeness method "${AT_LEAST_ONE_DATAVALUE.label}" is chosen, otherwise received messages will not be processed.`
                    )}
                </NoticeBox>
            </FormRow>
        )
    }

    return null
}
