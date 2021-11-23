import { PropTypes } from '@dhis2/prop-types'
import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui'
import React from 'react'
import i18n from '../../../locales/index.js'
import { dataTest } from '../../utils/index.js'

export const DeleteConfirmationDialog = ({
    children,
    onCancelClick,
    onDeleteClick,
}) => {
    return (
        <Modal dataTest={dataTest('shared-deleteconfirmationdialog')}>
            <ModalTitle>{i18n.t('Confirm deletion')}</ModalTitle>
            <ModalContent>{children}</ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button
                        secondary
                        onClick={onCancelClick}
                        dataTest={dataTest(
                            'shared-deleteconfirmationdialog-cancel'
                        )}
                    >
                        {i18n.t('Cancel')}
                    </Button>

                    <Button
                        primary
                        onClick={onDeleteClick}
                        dataTest={dataTest(
                            'shared-deleteconfirmationdialog-confirm'
                        )}
                    >
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DeleteConfirmationDialog.propTypes = {
    children: PropTypes.any.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}
