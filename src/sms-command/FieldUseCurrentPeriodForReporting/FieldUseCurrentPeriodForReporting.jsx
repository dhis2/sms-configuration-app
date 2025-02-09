import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'

const { Field } = ReactFinalForm

export const FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME =
    'currentPeriodUsedForReporting'

export const FieldUseCurrentPeriodForReporting = () => (
    <Field
        type="checkbox"
        dataTest={dataTest('smscommand-fieldusecurrentperiodforreporting')}
        name={FIELD_USE_CURRENT_PERIOD_FOR_REPORTING_NAME}
        label={i18n.t('Use current period for reporting')}
        component={CheckboxFieldFF}
    />
)
