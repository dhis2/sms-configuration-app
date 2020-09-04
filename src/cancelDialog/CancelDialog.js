import { Button, ButtonStrip, Modal, ModalTitle, ModalActions } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import i18n from '../locales'

export const CancelDialog = ({ onConfirmCancel, onAbortCancel }) => (
    <Modal>
        <ModalTitle>
            {i18n.t(
                'Are you sure you want to cancel? Unsaved changes will be lost'
            )}
        </ModalTitle>

        <ModalActions>
            <ButtonStrip>
                <Button onClick={onAbortCancel}>
                    {i18n.t('No, stay on page')}
                </Button>

                <Button primary onClick={onConfirmCancel}>
                    {i18n.t('Yes, cancel')}
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

CancelDialog.propTypes = {
    onAbortCancel: PropTypes.func.isRequired,
    onConfirmCancel: PropTypes.func.isRequired,
}
