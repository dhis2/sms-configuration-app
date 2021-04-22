import { PropTypes } from '@dhis2/prop-types'
import { ButtonStrip, Button } from '@dhis2/ui'
import React from 'react'
import { dataTest } from '../../utils'
import styles from './ListActions.module.css'

export const ListActions = ({
    addLabel,
    deleteLabel,
    onAddClick,
    onDeleteClick,
    disableAdd,
    disableDelete,
}) => {
    return (
        <div
            className={styles.container}
            data-test={dataTest('shared-listactions')}
        >
            <ButtonStrip data-test={dataTest('shared-listactions-actions')}>
                <Button
                    primary
                    onClick={onAddClick}
                    disabled={disableAdd}
                    dataTest={dataTest(`shared-listactions-add`)}
                >
                    {addLabel}
                </Button>

                <Button
                    destructive
                    onClick={onDeleteClick}
                    disabled={disableDelete}
                    dataTest={dataTest(`shared-listactions-delete`)}
                >
                    {deleteLabel}
                </Button>
            </ButtonStrip>
        </div>
    )
}

ListActions.propTypes = {
    addLabel: PropTypes.string.isRequired,
    deleteLabel: PropTypes.string.isRequired,
    onAddClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    disableAdd: PropTypes.bool,
    disableDelete: PropTypes.bool,
}
