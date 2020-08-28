import {
    Button,
    ButtonStrip,
    Modal,
    ModalActions,
    ModalContent,
    ModalTitle,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import i18n from '../locales'

export const DeleteCommandsConfirmationDialog = ({
    commands,
    onCancelClick,
    onDeleteClick,
}) => {
    return (
        <Modal dataTest={dataTest('commands-deleteconfirmationdialog')}>
            <ModalTitle>{i18n.t('Delete confirmation')}</ModalTitle>
            <ModalContent>
                {commands && (
                    <Table>
                        <TableHead>
                            <TableRowHead>
                                <TableCellHead>{i18n.t('Name')}</TableCellHead>
                            </TableRowHead>
                        </TableHead>

                        <TableBody>
                            {commands.map(command => (
                                <TableRow key={command.id}>
                                    <TableCell>{command.displayName}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                        {i18n.t('Delete command configurations')}
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DeleteCommandsConfirmationDialog.propTypes = {
    commands: PropTypes.arrayOf(
        PropTypes.shape({
            displayName: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    ).isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}
