import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales'
import { dataTest } from '../../../shared/utils'

const { Field } = ReactFinalForm

export const FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME =
    'moreThanOneOrgUnitMessage'

export const FieldMoreThanOneOrgUnitMessage = () => (
    <Field
        dataTest={dataTest('forms-fieldcommandmorethanoneorgunitmessage')}
        name={FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME}
        label={i18n.t('More than one orgunit message')}
        component={TextAreaFieldFF}
    />
)
