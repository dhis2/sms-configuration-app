import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

export const DeleteCommandsConfirmationDialog = ({
    onCancelClick,
    onDeleteClick,
}) => {
    return (
        <Modal dataTest={dataTest('commands-deleteconfirmationdialog')}>
            <ModalTitle>{i18n.t('Confirm deletion')}</ModalTitle>
            <ModalContent>
                {i18n.t(
                    'Are you sure you want to delete the selected commands?'
                )}
            </ModalContent>
            <ModalActions>
                <ButtonStrip>
                    <Button
                        secondary
                        onClick={onCancelClick}
                        dataTest={dataTest(
                            'commands-deleteconfirmationdialog-cancel'
                        )}
                    >
                        {i18n.t('Cancel')}
                    </Button>

                    <Button
                        primary
                        onClick={onDeleteClick}
                        dataTest={dataTest(
                            'commands-deleteconfirmationdialog-confirm'
                        )}
                    >
                        {i18n.t('Delete')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DeleteCommandsConfirmationDialog.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}
