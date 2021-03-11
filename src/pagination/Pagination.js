import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import { Button, SingleSelect, SingleSelectOption } from '@dhis2/ui'
import React from 'react'
import { useQueryParams } from '../hooks'
import styles from './Pagination.module.css'

const PAGE_LENGTHS = ['1', '2', '10', '20', '30', '40', '50', '100']

export const Pagination = ({ page, pageCount, pageSize, total }) => {
    const firstItem = Math.min((page - 1) * pageSize + 1, total)
    const lastItem = Math.min(firstItem + pageSize - 1, total)
    const availablePages = Array.from({ length: pageCount }, (_x, i) =>
        (i + 1).toString()
    )
    const [, setQueryParams] = useQueryParams()
    const setPage = page => {
        setQueryParams({ page })
    }
    const setPageSize = pageSize => {
        setQueryParams({ pageSize, page: 1 })
    }

    return (
        <div className={styles.container}>
            <div className={styles.verticalAlign}>
                {i18n.t('Show')}
                <SingleSelect
                    dense
                    selected={pageSize.toString()}
                    onChange={({ selected }) => setPageSize(selected)}
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
                    onClick={() => setPage(page - 1)}
                >
                    {i18n.t('Previous')}
                </Button>
                <span>{i18n.t('Page')}</span>
                <SingleSelect
                    dense
                    inputWidth="600px"
                    selected={page.toString()}
                    onChange={({ selected }) => setPage(selected)}
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
                    onClick={() => setPage(page + 1)}
                >
                    {i18n.t('Next')}
                </Button>
            </div>
        </div>
    )
}

Pagination.propTypes = {
    page: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
}
