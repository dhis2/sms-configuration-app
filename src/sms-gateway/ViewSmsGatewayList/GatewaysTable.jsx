import { PropTypes } from '@dhis2/prop-types'
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
import React from 'react'
import { useHistory } from 'react-router-dom'
import i18n from '../../locales/index.js'
import { dataTest } from '../../shared/index.js'
import styles from './GatewaysTable.module.css'
import { getTypeLabelByType } from './getTypeLabelByType.js'

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
        <Table dataTest={dataTest('smsgateway-stable')}>
            <TableHead>
                <TableRowHead>
                    <TableCellHead
                        dataTest={dataTest('smsgateway-table-checkall')}
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
                {gateways.map((gateway) => (
                    <TableRow
                        key={gateway.uid}
                        dataTest={dataTest('smsgateway-table-row')}
                    >
                        <TableCell
                            className={styles.checkboxCell}
                            dataTest={dataTest('smsgateway-table-checkbox')}
                        >
                            <Checkbox
                                value={gateway.uid}
                                onChange={() => onGatewayToggle(gateway.uid)}
                                checked={checkedGateways.includes(gateway.uid)}
                                dataTest={dataTest('smsgateway-table-id')}
                            />
                        </TableCell>

                        <TableCell dataTest={dataTest('smsgateway-table-name')}>
                            {gateway.name}
                        </TableCell>

                        <TableCell
                            className={styles.typeCell}
                            dataTest={dataTest('smsgateway-table-type')}
                        >
                            {getTypeLabelByType(gateway.type)}
                        </TableCell>

                        <TableCell className={styles.defaultCell}>
                            {!gateway.isDefault ? (
                                <Button
                                    dataTest={dataTest(
                                        'smsgateway-table-makedefault'
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
                                        'smsgateway-table-isdefault'
                                    )}
                                >
                                    {i18n.t('Default gateway')}
                                </span>
                            )}
                        </TableCell>

                        <TableCell
                            dataTest={dataTest('smsgateway-table-actions')}
                            className={styles.editCell}
                        >
                            <ButtonStrip className={styles.rowActions}>
                                <Button
                                    dataTest={dataTest('smsgateway-table-edit')}
                                    onClick={() => {
                                        history.push(
                                            `sms-gateway/${gateway.uid}`
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
