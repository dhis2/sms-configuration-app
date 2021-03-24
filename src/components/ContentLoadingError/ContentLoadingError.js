import { PropTypes } from '@dhis2/prop-types'
import { NoticeBox } from '@dhis2/ui'
import React from 'react'

export const ContentLoadingError = ({ title, errorMessage }) => (
    <NoticeBox error title={title}>
        {errorMessage}
    </NoticeBox>
)

ContentLoadingError.propTypes = {
    errorMessage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}
