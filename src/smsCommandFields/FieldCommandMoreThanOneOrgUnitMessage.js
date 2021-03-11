import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import { FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME } from './fieldNames'

const { Field } = ReactFinalForm

export const FieldCommandMoreThanOneOrgUnitMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandmorethanoneorgunitmessage')}
        name={FIELD_COMMAND_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME}
        label={i18n.t('More than one orgunit message')}
        component={TextAreaFieldFF}
    />
)
