import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { FieldDataElementWithCategoryOptionCombo } from './FieldDataElementWithCategoryOptionCombo'
import { DataElementTimesCategoryOptionCombosCompletenessMessage } from './DataElementTimesCategoryOptionCombosCompletenessMessage'
import { FormRow } from '../forms'
import { PageSubHeadline } from '../headline'
import { dataTest } from '../dataTest'
import i18n from '../locales'
import styles from './DataElementTimesCategoryOptionCombos.module.css'

export const DataElementTimesCategoryOptionCombos = ({
    DE_COC_combinations,
}) => (
    <div
        data-test={dataTest(
            'smscommandfields-dataelementtimescategoryoptioncombos'
        )}
    >
        <PageSubHeadline>{i18n.t('SMS short codes')}</PageSubHeadline>

        <DataElementTimesCategoryOptionCombosCompletenessMessage />

        <div
            data-test={dataTest(
                'smscommandfields-dataelementtimescategoryoptioncombos-rows'
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
                code: PropTypes.string.isRequired,
                displayName: PropTypes.string.isRequired,
                id: PropTypes.string.isRequired,
            }),
        })
    ).isRequired,
}
