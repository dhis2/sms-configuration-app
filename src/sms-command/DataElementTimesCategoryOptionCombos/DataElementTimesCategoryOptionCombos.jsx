import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import i18n from '../../locales/index.js'
import { FormRow, PageSubHeadline, dataTest } from '../../shared/index.js'
import { FieldDataElementWithCategoryOptionCombo } from '../FieldDataElementWithCategoryOptionCombo/index.js'
import { CompletenessMessage } from './CompletenessMessage.jsx'
import styles from './DataElementTimesCategoryOptionCombos.module.css'

export const DataElementTimesCategoryOptionCombos = ({
    DE_COC_combinations,
}) => (
    <div
        data-test={dataTest('smscommand-dataelementtimescategoryoptioncombos')}
    >
        <PageSubHeadline>{i18n.t('SMS short codes')}</PageSubHeadline>

        <CompletenessMessage />

        <div
            data-test={dataTest(
                'smscommand-dataelementtimescategoryoptioncombos-rows'
            )}
        >
            {DE_COC_combinations.map(({ dataElement, categoryOptionCombo }) => {
                return (
                    <FormRow
                        className={styles.formRow}
                        key={dataElement.id + categoryOptionCombo?.id}
                    >
                        <FieldDataElementWithCategoryOptionCombo
                            dataElement={dataElement}
                            categoryOptionCombo={categoryOptionCombo}
                        />
                    </FormRow>
                )
            })}
        </div>
    </div>
)

DataElementTimesCategoryOptionCombos.defaultProps = {
    allRequired: false,
}

DataElementTimesCategoryOptionCombos.propTypes = {
    DE_COC_combinations: PropTypes.arrayOf(
        PropTypes.shape({
            dataElement: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }).isRequired,
            categoryOptionCombo: PropTypes.shape({
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        })
    ).isRequired,
}
