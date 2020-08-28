import { Button, InputFieldFF, ReactFinalForm, hasValue } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React, { useState } from 'react'

import { DE_COC_toFormName } from '../smsCommand'
import { FieldDataElementWithCategoryOptionComboFormula } from './FieldDataElementWithCategoryOptionComboFormula'
import { FormRow } from '../forms'
import { get } from '../utils'
import i18n from '../locales'
import styles from './FieldDataElementWithCategoryOptionCombo.module.css'

const { Field, FormSpy } = ReactFinalForm

export const FieldDataElementWithCategoryOptionCombo = ({
    dataElement,
    categoryOptionCombo,
    required,
}) => {
    const [showFormula, setShowFormula] = useState(false)

    const label = categoryOptionCombo
        ? `${dataElement.displayName} ${categoryOptionCombo.displayName}`
        : `${dataElement.displayName} ${i18n.t('default')}`

    const baseName = DE_COC_toFormName(dataElement, categoryOptionCombo)
    const name = `${baseName}.code`
    const formulaName = `${baseName}.formula`

    return (
        <FormSpy subscription={{ values: true }}>
            {({ values }) => {
                const code = get(name, values)
                const formula = get(formulaName, values)

                return (
                    <div className={styles.container}>
                        <FormRow>
                            <Field
                                required={required}
                                className={styles.field}
                                label={label}
                                name={name}
                                component={InputFieldFF}
                                validate={required ? hasValue : undefined}
                            />
                        </FormRow>

                        {code && (
                            <>
                                <Button onClick={() => setShowFormula(true)}>
                                    {formula
                                        ? i18n.t('Change formula')
                                        : i18n.t('Add formula')}
                                </Button>

                                {showFormula && (
                                    <FieldDataElementWithCategoryOptionComboFormula
                                        targetFieldName={`${baseName}.formula`}
                                        onClose={() => setShowFormula(false)}
                                    />
                                )}
                            </>
                        )}
                    </div>
                )
            }}
        </FormSpy>
    )
}

FieldDataElementWithCategoryOptionCombo.defaultProps = {
    categoryOptionCombo: null,
    formula: '',
    required: false,
}

FieldDataElementWithCategoryOptionCombo.propTypes = {
    dataElement: PropTypes.shape({
        displayName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }).isRequired,
    categoryOptionCombo: PropTypes.shape({
        code: PropTypes.string.isRequired,
        displayName: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }),
    required: PropTypes.bool,
}
