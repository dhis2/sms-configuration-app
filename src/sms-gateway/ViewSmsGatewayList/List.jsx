import { PropTypes } from '@dhis2/prop-types'
import { CircularLoader } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../../shared/index.js'
import { GatewaysTable } from './GatewaysTable.jsx'
import styles from './List.module.css'

export const List = ({
    checkedGateways,
    gateways,
    setCheckedGateways,
    onMakeDefaultClick,
    processing,
}) => {
    const allGatewaysChecked = checkedGateways.length === gateways.length

    const toggleGateway = (id) => {
        if (checkedGateways.includes(id)) {
            const index = checkedGateways.findIndex((curId) => curId === id)

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
        <div
            className={styles.container}
            data-test={dataTest('smsgateway-viewsmsgatewaylist-list')}
        >
            {processing && (
                <div className={styles.processingMessage}>
                    <div className={styles.loadingContainer}>
                        <CircularLoader />
                    </div>
                </div>
            )}

            <GatewaysTable
                allGatewaysChecked={allGatewaysChecked}
                gateways={gateways}
                checkedGateways={checkedGateways}
                onGatewayToggle={toggleGateway}
                onMakeDefaultClick={onMakeDefaultClick}
                onToggleAll={toggleAll}
            />
        </div>
    )
}

List.propTypes = {
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
    onMakeDefaultClick: PropTypes.func.isRequired,
    processing: PropTypes.bool,
}
