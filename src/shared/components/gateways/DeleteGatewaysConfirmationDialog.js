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
import i18n from '../../locales'
import { dataTest } from '../../utils'

export const DeleteGatewaysConfirmationDialog = ({
    onCancelClick,
    onDeleteClick,
}) => (
    <Modal dataTest={dataTest('gateways-deleteconfirmationdialog')}>
        <ModalTitle>{i18n.t('Confirm deletion')}</ModalTitle>
        <ModalContent>
            {i18n.t('Are you sure you want to delete the selected gateways?')}
        </ModalContent>
        <ModalActions>
            <ButtonStrip>
                <Button
                    secondary
                    onClick={onCancelClick}
                    dataTest={dataTest(
                        'gateways-deleteconfirmationdialog-cancel'
                    )}
                >
                    Cancel
                </Button>

                <Button
                    destructive
                    onClick={onDeleteClick}
                    dataTest={dataTest(
                        'gateways-deleteconfirmationdialog-confirm'
                    )}
                >
                    Delete
                </Button>
            </ButtonStrip>
        </ModalActions>
    </Modal>
)

DeleteGatewaysConfirmationDialog.propTypes = {
    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}
