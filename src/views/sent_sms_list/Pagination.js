import React, { useContext } from 'react'
import { Button, SingleSelect, SingleSelectOption } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import i18n from '../../locales'
import RefetchSms from './RefetchSms'
import s from './Pagination.module.css'

const pageSizes = ['10', '20', '30', '40', '50', '100']

const Pagination = ({ pager }) => {
    const { refetchAndClear } = useContext(RefetchSms)
    const changePage = newPage => {
        refetchAndClear({ page: newPage })
    }
    const changePageSize = newSize => {
        refetchAndClear({ pageSize: newSize, page: 1 })
    }

    const { page, pageCount, pageSize, total } = pager
    const firstItem = Math.min((page - 1) * pageSize + 1, total)
    const lastItem = Math.min(firstItem + pageSize - 1, total)
    const availablePages = Array.from({ length: pageCount }, (_x, i) =>
        (i + 1).toString()
    )

    return (
        <div className={s.container}>
            <div className={s.left}>
                <div>{i18n.t('SMSes per page')}</div>
                <SingleSelect
                    dense
                    selected={pageSize.toString()}
                    onChange={({ selected }) => changePageSize(selected)}
                >
                    {pageSizes.map(size => (
                        <SingleSelectOption
                            key={size}
                            value={size}
                            label={size}
                        />
                    ))}
                </SingleSelect>
            </div>
            <div className={s.right}>
                <div className={s.amount}>
                    {i18n.t('Viewing {{firstItem}}-{{lastItem}} of {{total}}', {
                        firstItem,
                        lastItem,
                        total,
                    })}
                </div>
                <Button
                    small
                    disabled={page === 1}
                    onClick={() => changePage(page - 1)}
                >
                    {i18n.t('Previous')}
                </Button>
                <div className={s.pageselection}>
                    <div>{i18n.t('Page')}</div>
                    <SingleSelect
                        dense
                        selected={page.toString()}
                        onChange={({ selected }) => {
                            changePage(selected)
                        }}
                    >
                        {availablePages.map(page => (
                            <SingleSelectOption
                                key={page}
                                value={page}
                                label={page}
                            />
                        ))}
                    </SingleSelect>
                    <div>{i18n.t('of {{pageCount}}', { pageCount })}</div>
                </div>
                <Button
                    small
                    disabled={page === pageCount}
                    onClick={() => changePage(page + 1)}
                >
                    {i18n.t('Next')}
                </Button>
            </div>
        </div>
    )
}

Pagination.propTypes = {
    pager: PropTypes.shape({
        page: PropTypes.number.isRequired,
        pageCount: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
}

export default Pagination
