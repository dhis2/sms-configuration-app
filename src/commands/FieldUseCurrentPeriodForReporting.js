import { CheckboxFieldFF, ReactFinalForm } from '@dhis2/ui'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

const { Field } = ReactFinalForm

export const FieldUseCurrentPeriodForReporting = () => (
    <Field
        required
        type="checkbox"
        dataTest={dataTest('forms-fieldusecurrentperiodforreporting')}
        name="currentPeriodUsedForReporting"
        label={i18n.t('Use current period for reporting')}
        component={CheckboxFieldFF}
    />
)
