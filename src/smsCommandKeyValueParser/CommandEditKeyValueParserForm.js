import { PropTypes } from '@dhis2/prop-types'
import React from 'react'

import { CommandEditWithDataSetForm } from '../smsCommandWithDataSet'
import { dataTest } from '../dataTest'

export const CommandEditKeyValueParserForm = ({ commandId, onAfterChange }) => (
    <CommandEditWithDataSetForm
        dataTest={dataTest(
            'smscommandkeyvalueparser-commandeditkeyvalueparserform'
        )}
        commandId={commandId}
        onAfterChange={onAfterChange}
    />
)

CommandEditKeyValueParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
}
