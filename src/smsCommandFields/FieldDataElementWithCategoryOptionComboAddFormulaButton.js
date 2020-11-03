import { Button, ReactFinalForm } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { useDataEngine } from '@dhis2/app-runtime'
import React, { useEffect, useState } from 'react'
import i18n from '../locales'
import styles from './FieldDataElementWithCategoryOptionComboAddFormulaButton.module.css'

const { useField } = ReactFinalForm

const DATA_ELEMENTS_QUERY = {
    dataElement: {
        resource: 'dataElements',
        id: ({ id }) => id,
        params: () => ({ fields: 'displayName' }),
    },
}

export const FieldDataElementWithCategoryOptionComboAddFormulaButton = ({
    baseName,
    onClick,
    disabled,
}) => {
    const engine = useDataEngine()
    const [called, setCalled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formulaDataElementName, setFormulaDataElementName] = useState('')

    const smsCode = useField(baseName, {
        subscription: { value: true },
    }).input.value

    const { formula, code } = smsCode
    const operator = formula && formula[0]
    const dataElementId = formula && formula.slice(1)

    useEffect(() => {
        if (!called && dataElementId) {
            setLoading(true)
            setCalled(true)

            engine
                .query(DATA_ELEMENTS_QUERY, {
                    variables: { id: dataElementId },
                })
                .then(response => {
                    const { displayName } = response.dataElement
                    setFormulaDataElementName(displayName)
                })
                .finally(() => setLoading(false))
        }
    }, [dataElementId, called])

    return (
        <>
            {loading && i18n.t('Loading formula')}
            {code && formula && formulaDataElementName && (
                <span className={styles.formulaInWords}>
                    <span className={styles.formulaInWordsLabel}>
                        {i18n.t('Formula')}:
                    </span>

                    {code}
                    {` ${operator} `}
                    {formulaDataElementName}
                </span>
            )}

            <Button small onClick={onClick} disabled={disabled}>
                {formula ? i18n.t('Edit formula') : i18n.t('Add formula')}
            </Button>
        </>
    )
}

FieldDataElementWithCategoryOptionComboAddFormulaButton.propTypes = {
    baseName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
}
