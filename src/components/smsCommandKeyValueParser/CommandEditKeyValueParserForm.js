import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { dataTest } from '../../dataTest'
import { CommandEditWithDataSetForm } from '../smsCommandWithDataSet'

export const CommandEditKeyValueParserForm = ({
    commandId,
    onAfterChange,
    onCancel,
}) => (
    <CommandEditWithDataSetForm
        dataTest={dataTest(
            'smscommandkeyvalueparser-commandeditkeyvalueparserform'
        )}
        commandId={commandId}
        onAfterChange={onAfterChange}
        onCancel={onCancel}
    />
)

CommandEditKeyValueParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
