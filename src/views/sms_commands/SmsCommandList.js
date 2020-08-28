import {
    Button,
    Checkbox,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableRowHead,
    TableCell,
    TableCellHead,
} from '@dhis2/ui'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

import { SMS_COMMAND_FORM_EDIT_PATH_STATIC } from './SmsCommandFormEdit'
import { SMS_COMMAND_FORM_NEW_PATH } from './SmsCommandFormNew'
import { ListActions } from '../../dataList'
import { PageHeadline } from '../../headline'
import {
    DeleteCommandsConfirmationDialog,
    getLabelByParserTypes,
    useDeleteSmsCommandMutation,
    useReadSmsCommandsQuery,
} from '../../smsCommand'
import { dataTest } from '../../dataTest'
import i18n from '../../locales'
import styles from './SmsCommandList.module.css'

export const SMS_COMMAND_LIST_LABEL = i18n.t('SMS Command')
export const SMS_COMMAND_LIST_PATH = '/sms-config'

export const SmsCommandList = () => {
    const history = useHistory()
    const onAddCommandClick = () => history.push(SMS_COMMAND_FORM_NEW_PATH)
    const [checkedSmsCommands, setCheckedSmsCommands] = useState([])
    const [
        showDeleteConfirmationDialog,
        setShowDeleteConfirmationDialog,
    ] = useState(false)

    const {
        loading: loadingReadSmsCommands,
        error: errorReadSmsCommands,
        data,
        refetch,
    } = useReadSmsCommandsQuery()

    const [
        deleteSmsCommands,
        { loading: loadingDelete /*, error: errorDelete */ },
    ] = useDeleteSmsCommandMutation()

    const onToggleCallChange = () => {
        const smsCommands = data?.smsCommands?.smsCommands

        if (!smsCommands) {
            return
        }

        if (checkedSmsCommands.length === smsCommands.length) {
            setCheckedSmsCommands([])
        } else {
            setCheckedSmsCommands(
                smsCommands.map(({ id, displayName }) => ({ id, displayName }))
            )
        }
    }

    const toggleSmsCommand = smsCommand => {
        const { id } = smsCommand

        if (checkedSmsCommands.find(({ id: checkedId }) => id === checkedId)) {
            const index = checkedSmsCommands.findIndex(
                ({ id: checkedId }) => id === checkedId
            )

            return setCheckedSmsCommands([
                ...checkedSmsCommands.slice(0, index),
                ...checkedSmsCommands.slice(index + 1),
            ])
        }

        return setCheckedSmsCommands([...checkedSmsCommands, smsCommand])
    }

    const onDeleteClick = async () => {
        const ids = checkedSmsCommands.map(({ id }) => id)
        await deleteSmsCommands({ ids })

        setCheckedSmsCommands([])
        setShowDeleteConfirmationDialog(false)
        refetch()
    }

    const allChecked =
        checkedSmsCommands.length === data?.smsCommands?.smsCommands?.length

    return (
        <div data-test={dataTest('views-smscommandlist')}>
            <PageHeadline>{SMS_COMMAND_LIST_LABEL}</PageHeadline>

            <p>
                {i18n.t(
                    'There are five different types of SmsCommands supported by SMS Service. SMS can be sent if any one of the gateway is configured. If more than one gateways are present, then they will be used in round-robin fashion for load balancing'
                )}
            </p>

            <ListActions
                addLabel={i18n.t('Add command')}
                deleteLabel={i18n.t('Delete selected gateway commands')}
                dataTest="views-smscommandlist"
                onAddClick={onAddCommandClick}
                onDeleteClick={() => setShowDeleteConfirmationDialog(true)}
                disableAdd={loadingDelete}
                disableDelete={!checkedSmsCommands.length || loadingDelete}
            />

            {showDeleteConfirmationDialog && (
                <DeleteCommandsConfirmationDialog
                    commands={checkedSmsCommands}
                    onCancelClick={() => setShowDeleteConfirmationDialog(false)}
                    onDeleteClick={onDeleteClick}
                />
            )}

            {loadingReadSmsCommands && i18n.t('Loading gateway configurations')}
            {errorReadSmsCommands &&
                i18n.t(
                    'Something went wrong: %s',
                    errorReadSmsCommands.message
                )}

            <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>
                            <Checkbox
                                checked={allChecked}
                                onChange={onToggleCallChange}
                            />
                        </TableCellHead>
                        <TableCellHead>{i18n.t('Sms command')}</TableCellHead>
                        <TableCellHead>{i18n.t('Parser')}</TableCellHead>
                        <TableCellHead />
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {data?.smsCommands?.smsCommands?.map(
                        ({ id, displayName, parserType }) => (
                            <TableRow key={id}>
                                <TableCell className={styles.checkbox}>
                                    <Checkbox
                                        checked={
                                            !!checkedSmsCommands.find(
                                                ({ id: checkedId }) =>
                                                    id === checkedId
                                            )
                                        }
                                        onChange={() =>
                                            toggleSmsCommand({
                                                id,
                                                displayName,
                                            })
                                        }
                                    />
                                </TableCell>

                                <TableCell>{displayName}</TableCell>

                                <TableCell>
                                    {getLabelByParserTypes(parserType)}
                                </TableCell>

                                <TableCell className={styles.editButtonCell}>
                                    <Button
                                        onClick={() =>
                                            history.push(
                                                `${SMS_COMMAND_FORM_EDIT_PATH_STATIC}/${id}`
                                            )
                                        }
                                    >
                                        {i18n.t('Edit')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
