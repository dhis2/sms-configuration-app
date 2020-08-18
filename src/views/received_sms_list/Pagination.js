import React from 'react'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '@dhis2/d2-i18n'
import { useHistory } from 'react-router-dom'
import { Button, SingleSelect, SingleSelectOption } from '@dhis2/ui'
import { useQueryParams } from './useQueryParams'
import { createSearchString } from './createSearchString'
import styles from './Pagination.module.css'

const PAGE_LENGTHS = ['1', '2', '10', '20', '30', '40', '50', '100']

const Pagination = ({ page, pageCount, pageSize, total }) => {
    const firstItem = Math.min((page - 1) * pageSize + 1, total)
    const lastItem = Math.min(firstItem + pageSize - 1, total)
    const availablePages = Array.from({ length: pageCount }, (_x, i) =>
        (i + 1).toString()
    )
    const { status, phoneNumber } = useQueryParams()
    const history = useHistory()
    const navigateToPage = newPage => {
        history.push({
            search: createSearchString({
                status,
                phoneNumber,
                pageSize,
                page: newPage,
            }),
        })
    }
    const navigateToNewPageSize = ({ selected }) => {
        history.push({
            search: createSearchString({
                status,
                phoneNumber,
                pageSize: selected,
                page: 1,
            }),
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.verticalAlign}>
                {i18n.t('Show')}
                <SingleSelect
                    dense
                    selected={pageSize.toString()}
                    onChange={navigateToNewPageSize}
                    className={styles.select}
                >
                    {PAGE_LENGTHS.map(length => (
                        <SingleSelectOption
                            key={length}
                            value={length}
                            label={length}
                        />
                    ))}
                </SingleSelect>
                {i18n.t('per page')}
            </div>

            <div className={styles.verticalAlign}>
                <span className={styles.summary}>
                    {i18n.t('Viewing {{firstItem}}-{{lastItem}} of {{total}}', {
                        firstItem,
                        lastItem,
                        total,
                    })}
                </span>
                <Button
                    className={styles.buttonPrevious}
                    small
                    disabled={page === 1}
                    onClick={() => navigateToPage(page - 1)}
                >
                    {i18n.t('Previous')}
                </Button>
                <span>{i18n.t('Page')}</span>
                <SingleSelect
                    dense
                    inputWidth="600px"
                    selected={page.toString()}
                    onChange={({ selected }) => navigateToPage(selected)}
                    className={styles.select}
                >
                    {availablePages.map(availablePage => (
                        <SingleSelectOption
                            key={availablePage}
                            value={availablePage}
                            label={availablePage}
                        />
                    ))}
                </SingleSelect>
                <span>{i18n.t('of {{pageCount}}', { pageCount })}</span>
                <Button
                    className={styles.buttonNext}
                    small
                    disabled={page === pageCount}
                    onClick={() => navigateToPage(page + 1)}
                >
                    {i18n.t('Next')}
                </Button>
            </div>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number,
    pageCount: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.number,
}

export { Pagination }
