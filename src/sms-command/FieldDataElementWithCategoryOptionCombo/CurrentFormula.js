import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import styles from './CurrentFormula.module.css'

export const CurrentFormula = ({
    code,
    formula,
    formulaDataElementName,
    loading,
    operator,
}) => {
    if (!code || !formula || !formulaDataElementName || !operator) {
        return null
    }

    return (
        <span
            className={styles.formulaInWords}
            data-test={dataTest(
                'smscommand-fielddataelementwithcategoryoptioncombo-currentformula'
            )}
        >
            <span className={styles.formulaInWordsLabel}>
                {i18n.t('Formula')}:
            </span>

            {loading && i18n.t('Loading formula')}
            {!loading && `${code} ${operator} ${formulaDataElementName}`}
        </span>
    )
}

CurrentFormula.propTypes = {
    loading: PropTypes.bool.isRequired,
    code: PropTypes.string,
    formula: PropTypes.string,
    formulaDataElementName: PropTypes.string,
    operator: PropTypes.string,
}
