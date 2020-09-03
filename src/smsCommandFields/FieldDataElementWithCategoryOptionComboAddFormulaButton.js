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
        params: ({ code }) => ({
            filter: `code:eq:${code}`,
            fields: 'displayName',
            paging: 'false',
        }),
    },
}

export const FieldDataElementWithCategoryOptionComboAddFormulaButton = ({
    baseName,
    onClick,
}) => {
    const engine = useDataEngine()
    const [called, setCalled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formulaInWords, setFormulaInWords] = useState(null)

    const smsCode = useField(baseName, {
        subscription: { value: true },
    }).input.value

    const { formula } = smsCode
    const operator = formula && formula[0]
    const dataElementCode = formula && formula.slice(1)

    useEffect(() => {
        if (!called && dataElementCode) {
            setLoading(true)
            setCalled(true)

            engine
                .query(DATA_ELEMENTS_QUERY, {
                    variables: { code: dataElementCode },
                })
                .then(response => {
                    const [{ displayName }] = response.dataElement.dataElements

                    setFormulaInWords(
                        operator === '-'
                            ? i18n.t('Subtract {{displayName}}', {
                                  displayName,
                              })
                            : i18n.t('Add {{displayName}}', { displayName })
                    )
                })
                .finally(() => setLoading(false))
        }
    }, [dataElementCode, called])

    return (
        <>
            {loading && i18n.t('Loading formula')}
            {formulaInWords && (
                <span className={styles.formulaInWords}>
                    <b>{i18n.t('Currently selected formula: ')}</b>
                    {formulaInWords}
                </span>
            )}

            <Button onClick={onClick}>
                {formula ? i18n.t('Edit formula') : i18n.t('Add formula')}
            </Button>
        </>
    )
}

FieldDataElementWithCategoryOptionComboAddFormulaButton.propTypes = {
    baseName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}
