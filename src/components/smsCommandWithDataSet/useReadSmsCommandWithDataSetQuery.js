import { useDataEngine } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'

// @TODO(non-critical):
//   The response for key value parser
//   does contain the information for "Data element category combination".
//   But it does not contain the id of the category option combo,
//   only the data element and a code.
export const READ_SMS_COMMAND_KEY_VALUE_PARSER_QUERY = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: {
            fields: [
                '*',
                'dataset[id,displayName,dataSetElements[dataElement[id,displayName,categoryCombo[categoryOptionCombos[id,displayName,code]]]]',
            ],
            paging: 'false',
        },
    },
}

export const useReadSmsCommandWithDataSetQuery = id => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    const engine = useDataEngine()

    const refetch = variables => {
        setLoading(true)
        setError(null)

        return engine
            .query(READ_SMS_COMMAND_KEY_VALUE_PARSER_QUERY, { variables })
            .then(response => {
                response.smsCommand.dataset.dataSetElements.sort(
                    (left, right) => {
                        const leftDisplayName = left.dataElement.displayName
                        const rightDisplayName = right.dataElement.displayName

                        if (leftDisplayName === rightDisplayName) {
                            return 0
                        }

                        if (leftDisplayName < rightDisplayName) {
                            return -1
                        }

                        return 1
                    }
                )

                setData(response)
            })
            .catch(setError)
            .finally(() => setLoading(false))
    }

    // initial request
    useEffect(() => {
        refetch({ id })
    }, [])

    return { loading, error, data, refetch }
}
