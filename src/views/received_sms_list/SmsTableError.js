import React from 'react'
import i18n from '@dhis2/d2-i18n'
import { PropTypes } from '@dhis2/prop-types'
import { NoticeBox } from '@dhis2/ui'

const SmsTableError = ({ message }) => (
    <NoticeBox error title={i18n.t('Could not load list of received SMSs')}>
        {message}
    </NoticeBox>
)

SmsTableError.propTypes = {
    message: PropTypes.string,
}

export { SmsTableError }
