import { useDataQuery } from '@dhis2/app-runtime'

const query = {
    smsCommand: {
        resource: 'smsCommands',
        id: ({ id }) => id,
        params: () => {
            const fields = [
                'name',
                'parserType',
                'separator',
                'defaultMessage',
                'wrongFormatMessage',
                'noUserMessage',
                'moreThanOneOrgUnitMessage',
                'successMessage',
                // The queries below should be reduced to only the data we need
                `program [
                    id,
                    displayName,
                    programTrackedEntityAttributes [
                        trackedEntityAttribute [
                            :all,
                            id,
                            displayName
                        ]
                    ]
                ]`,
                `smsCodes [
                    :all,
                    trackedEntityAttribute [
                        id,
                        displayName,
                        valueType
                    ]
                ]`,
            ]

            return {
                fields: fields.map((field) => field.replace(/(\n|\s)/g, '')),
            }
        },
    },
}

export const useCommandData = (id) => useDataQuery(query, { variables: { id } })
