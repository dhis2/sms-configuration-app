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
import { useReadGatewaysQuery } from './useReadGatewaysQuery'
import i18n from '../locales'

export const DeleteGatewaysConfirmationDialog = ({
    ids,
    onCancelClick,
    onDeleteClick,
}) => {
    const { loading, error, data } = useReadGatewaysQuery(ids)

    return (
        <Modal dataTest={dataTest('gateways-deleteconfirmationdialog')}>
            <ModalTitle>{i18n.t('Delete confirmation')}</ModalTitle>
            <ModalContent>
                {// @TODO(missing design): What should be displayed here?
                loading && 'Loading...'}

                {// @TODO(missing design): What should be displayed here?
                error && i18n.t('Error: {{error}}', { error: error.message })}

                {data?.gateways && (
                    <Table>
                        <TableHead>
                            <TableRowHead>
                                <TableCellHead>{i18n.t('Name')}</TableCellHead>
                                <TableCellHead>
                                    {i18n.t('Is default')}
                                </TableCellHead>
                            </TableRowHead>
                        </TableHead>

                        <TableBody>
                            {data.gateways.gateways.map(gateway => (
                                <TableRow key={gateway.uid}>
                                    <TableCell>{gateway.name}</TableCell>
                                    <TableCell>
                                        {gateway.isDefault ? 'Yes' : 'No'}
                                    </TableCell>
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
                            'gateways-deleteconfirmationdialog-cancel'
                        )}
                    >
                        Cancel
                    </Button>

                    <Button
                        primary
                        onClick={onDeleteClick}
                        dataTest={dataTest(
                            'gateways-deleteconfirmationdialog-confirm'
                        )}
                    >
                        Delete gateway configurations
                    </Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    )
}

DeleteGatewaysConfirmationDialog.propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string).isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
}
