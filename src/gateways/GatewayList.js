import {
    Button,
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
import React from 'react'

import { getTypeLabelByType } from './getTypeLabelByType'
import i18n from '../locales'

export const GatewayList = ({
    checkedGateways,
    gateways,
    setCheckedGateways,
}) => {
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

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead />
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
                                <Button>Make default</Button>
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
}
