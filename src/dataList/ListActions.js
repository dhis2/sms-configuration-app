import { ButtonStrip, Button } from '@dhis2/ui'
import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { dataTest } from '../dataTest'
import styles from './ListActions.module.css'

export const ListActions = ({
    addLabel,
    deleteLabel,
    dataTest: dataTestProp,
    onAddClick,
    onDeleteClick,
    disableAdd,
    disableDelete,
}) => {
    return (
        <div className={styles.container}>
            <ButtonStrip data-test={dataTest(`${dataTestProp}-actions`)}>
                <Button
                    primary
                    onClick={onAddClick}
                    disabled={disableAdd}
                    dataTest={dataTest(`${dataTestProp}-add`)}
                >
                    {addLabel}
                </Button>

                <Button
                    destructive
                    onClick={onDeleteClick}
                    disabled={disableDelete}
                    dataTest={dataTest(`${dataTestProp}-delete`)}
                >
                    {deleteLabel}
                </Button>
            </ButtonStrip>
        </div>
    )
}

ListActions.propTypes = {
    addLabel: PropTypes.string.isRequired,
    dataTest: PropTypes.string.isRequired,
    deleteLabel: PropTypes.string.isRequired,
    onAddClick: PropTypes.func.isRequired,
    onDeleteClick: PropTypes.func.isRequired,
    disableAdd: PropTypes.bool,
    disableDelete: PropTypes.bool,
}
