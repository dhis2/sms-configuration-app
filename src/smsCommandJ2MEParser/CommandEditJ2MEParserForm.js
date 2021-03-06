import { PropTypes } from '@dhis2/prop-types'
import React from 'react'
import { dataTest } from '../dataTest'
import { AT_LEAST_ONE_DATAVALUE } from '../smsCommandFields'
import { CommandEditWithDataSetForm } from '../smsCommandWithDataSet'

export const CommandEditJ2MEParserForm = ({
    commandId,
    onAfterChange,
    onCancel,
}) => (
    <CommandEditWithDataSetForm
        dataTest={dataTest(
            'smscommandkeyvalueparser-commandeditj2meparserform'
        )}
        commandId={commandId}
        onAfterChange={onAfterChange}
        onCancel={onCancel}
        initialCompletenessMethod={AT_LEAST_ONE_DATAVALUE.value}
    />
)

CommandEditJ2MEParserForm.propTypes = {
    commandId: PropTypes.string.isRequired,
    onAfterChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
}
