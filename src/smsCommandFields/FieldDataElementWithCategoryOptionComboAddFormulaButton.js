import { Button, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import i18n from '../locales'

const { useField } = ReactFinalForm

export const FieldDataElementWithCategoryOptionComboAddFormulaButton = ({
    formulaFieldName,
    onClick,
}) => {
    const { input } = useField(formulaFieldName, {
        subscription: { value: true },
    })

    const { value } = input

    return (
        <>
            {value && i18n.t()}
            <Button onClick={onClick}>
                {value ? i18n.t('Edit formula') : i18n.t('Add formula')}
            </Button>
        </>
    )
}

FieldDataElementWithCategoryOptionComboAddFormulaButton.propTypes = {
    formulaFieldName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
