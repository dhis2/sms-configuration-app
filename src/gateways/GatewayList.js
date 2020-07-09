import {
    Button,
    ButtonStrip,
    Checkbox,
    CircularLoader,
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

import { getTypeLabelByType } from './getTypeLabelByType'
import i18n from '../locales'
import { GATEWAY_CONFIG_FORM_EDIT_PATH_STATIC } from '../views/gateway_configuration/GatewayConfigFormEdit'
import styles from './GatewayList.module.css'

export const GatewayList = ({
    checkedGateways,
    gateways,
    setCheckedGateways,
    processing,
}) => {
    const history = useHistory()
    const allGatewaysChecked = checkedGateways.length === gateways.length

    const toggleGateway = id => {
        if (checkedGateways.includes(id)) {
            const index = checkedGateways.findIndex(curId => curId === id)

            const newCheckedGateways =
                index === 0
                    ? checkedGateways.slice(1)
                    : [
                          ...checkedGateways.slice(0, index),
                          ...checkedGateways.slice(index + 1),
                      ]

            setCheckedGateways(newCheckedGateways)
        } else {
            setCheckedGateways([...checkedGateways, id])
        }
    }

    const toggleAll = () => {
        if (!allGatewaysChecked) {
            const allGatewayIds = gateways.map(({ uid }) => uid)
            setCheckedGateways(allGatewayIds)
        } else {
            setCheckedGateways([])
        }
    }

    return (
        <div className={styles.container}>
            {processing && (
                <div className={styles.processingMessage}>
                    <div className={styles.loadingContainer}>
                        <CircularLoader />
                    </div>
                </div>
            )}

            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>
                            <Checkbox
                                onChange={toggleAll}
                                checked={allGatewaysChecked}
                            />
                        </TableCellHead>
                        <TableCellHead>{i18n.t('Name')}</TableCellHead>
                        <TableCellHead>{i18n.t('Type')}</TableCellHead>
                        <TableCellHead>
                            {i18n.t('Default gateway')}
                        </TableCellHead>
                        <TableCellHead />
                    </TableRowHead>
                </TableHead>

                <TableBody>
                    {gateways.map(gateway => (
                        <TableRow key={gateway.uid}>
                            <TableCell>
                                <Checkbox
                                    onChange={() => toggleGateway(gateway.uid)}
                                    checked={checkedGateways.includes(
                                        gateway.uid
                                    )}
                                />
                            </TableCell>
                            <TableCell>{gateway.name}</TableCell>
                            <TableCell>
                                {getTypeLabelByType(gateway.type)}
                            </TableCell>
                            <TableCell>
                                {gateway.isDefault
                                    ? i18n.t('Yes')
                                    : i18n.t('No')}
                            </TableCell>
                            <TableCell>
                                <ButtonStrip>
                                    {!gateway.isDefault && (
                                        <Button
                                            onClick={() =>
                                                alert(
                                                    '@TODO: Needs implementation'
                                                )
                                            }
                                        >
                                            {i18n.t('Make default')}
                                        </Button>
                                    )}

                                    <Button
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
        </div>
    )
}

GatewayList.propTypes = {
    checkedGateways: PropTypes.arrayOf(PropTypes.string).isRequired,
    gateways: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            uid: PropTypes.string.isRequired,
            isDefault: PropTypes.bool,
        })
    ).isRequired,
    setCheckedGateways: PropTypes.func.isRequired,
    processing: PropTypes.bool,
}
