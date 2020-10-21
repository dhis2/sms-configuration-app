import {
    Button,
    ButtonStrip,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRowHead,
    TableCellHead,
    TableRow,
    TableCell,
} from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import { useHistory } from 'react-router-dom'
import React from 'react'

import { GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC } from '../views/gateway_configuration/GatewayConfigFormEdit'
import { dataTest } from '../dataTest'
import { getTypeLabelByType } from './getTypeLabelByType'
import i18n from '../locales'
import styles from './GatewaysTable.module.css'

export const GatewaysTable = ({
    allGatewaysChecked,
    checkedGateways,
    gateways,
    onGatewayToggle,
    onToggleAll,
    onMakeDefaultClick,
}) => {
    const history = useHistory()

    return (
        <Table dataTest={dataTest('gateways-gatewaystable')}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead
                        dataTest={dataTest('gateways-gatewaystable-checkall')}
                    >
                        <Checkbox
                            onChange={onToggleAll}
                            checked={allGatewaysChecked}
                        />
                    </TableCellHead>
                    <TableCellHead>{i18n.t('Name')}</TableCellHead>
                    <TableCellHead>{i18n.t('Type')}</TableCellHead>
                    <TableCellHead />
                    <TableCellHead />
                </TableRowHead>
            </TableHead>

            <TableBody>
                {gateways.map(gateway => (
                    <TableRow
                        key={gateway.uid}
                        dataTest={dataTest('gateways-gatewaystable-row')}
                    >
                        <TableCell
                            className={styles.checkboxCell}
                            dataTest={dataTest(
                                'gateways-gatewaystable-checkbox'
                            )}
                        >
                            <Checkbox
                                value={gateway.uid}
                                onChange={() => onGatewayToggle(gateway.uid)}
                                checked={checkedGateways.includes(gateway.uid)}
                                dataTest={dataTest('gateways-gatewaystable-id')}
                            />
                        </TableCell>

                        <TableCell
                            dataTest={dataTest('gateways-gatewaystable-name')}
                        >
                            {gateway.name}
                        </TableCell>

                        <TableCell
                            className={styles.typeCell}
                            dataTest={dataTest('gateways-gatewaystable-type')}
                        >
                            {getTypeLabelByType(gateway.type)}
                        </TableCell>

                        <TableCell className={styles.defaultCell}>
                            {!gateway.isDefault ? (
                                <Button
                                    dataTest={dataTest(
                                        'gateways-gatewaystable-makedefault'
                                    )}
                                    onClick={() =>
                                        onMakeDefaultClick(gateway.uid)
                                    }
                                    className={styles.makeDefaultButton}
                                >
                                    {i18n.t('Make default')}
                                </Button>
                            ) : (
                                <span
                                    className={styles.isDefaultText}
                                    data-test={dataTest(
                                        'gateways-gatewaystable-isdefault'
                                    )}
                                >
                                    {i18n.t('Default gateway')}
                                </span>
                            )}
                        </TableCell>

                        <TableCell
                            dataTest={dataTest(
                                'gateways-gatewaystable-actions'
                            )}
                            className={styles.editCell}
                        >
                            <ButtonStrip className={styles.rowActions}>
                                <Button
                                    dataTest={dataTest(
                                        'gateways-gatewaystable-edit'
                                    )}
                                    onClick={() => {
                                        history.push(
                                            `${GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC}/${gateway.uid}`
                                        )
                                    }}
                                >
                                    {i18n.t('Edit')}
                                </Button>
                            </ButtonStrip>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

GatewaysTable.propTypes = {
    checkedGateways: PropTypes.arrayOf(PropTypes.string).isRequired,
    gateways: PropTypes.arrayOf(
        PropTypes.shape({
            isDefault: PropTypes.bool.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            uid: PropTypes.string.isRequired,
        })
    ).isRequired,
    onGatewayToggle: PropTypes.func.isRequired,
    onMakeDefaultClick: PropTypes.func.isRequired,
    onToggleAll: PropTypes.func.isRequired,
    allGatewaysChecked: PropTypes.bool,
}
