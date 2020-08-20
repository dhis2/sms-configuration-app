import React, { useContext } from 'react'
import { PropTypes } from '@dhis2/prop-types'
import RefetchSms from './RefetchSms'

// Generates a range for the paging controls
const range = (start, end) =>
    Array(end - start + 1)
        .fill()
        .map((_, idx) => start + idx)

const Pagination = ({ pager }) => {
    const refetch = useContext(RefetchSms)
    const { page, pageCount, pageSize, total } = pager
    const pageNumbers = range(1, pageCount)
    const onClick = targetPage => {
        refetch({ page: targetPage })
    }

    return (
        <div>
            page: {page}
            <br />
            pageCount: {pageCount}
            <br />
            pageSize: {pageSize}
            <br />
            total: {total}
            <br />
            {pageNumbers.map(number => (
                <button key={number} onClick={() => onClick(number)}>
                    {number}
                </button>
            ))}
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
