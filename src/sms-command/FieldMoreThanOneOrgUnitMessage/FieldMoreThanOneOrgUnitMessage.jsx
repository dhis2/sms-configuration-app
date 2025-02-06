import { TextAreaFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME =
    'moreThanOneOrgUnitMessage'

export const FieldMoreThanOneOrgUnitMessage = () => (
    <Field
        dataTest={dataTest('smscommand-fieldmorethanoneorgunitmessage')}
        name={FIELD_MORE_THAN_ONE_ORG_UNIT_MESSAGE_NAME}
        label={i18n.t('More than one orgunit message')}
        component={TextAreaFieldFF}
    />
)
