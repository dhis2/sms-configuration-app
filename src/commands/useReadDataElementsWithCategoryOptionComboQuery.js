import { useDataEngine } from '@dhis2/app-runtime'
import { useEffect, useState } from 'react'

import { queryDataElements } from '../dataElement'

const DATA_SET_QUERY = {
    dataSets: {
        resource: 'dataSets',
        id: ({ id }) => id,
        params: {
            fields: 'dataSetElements',
            paging: 'false',
        },
    },
}

const CATEGORY_COMBO_QUERY = {
    categoryCombos: {
        resource: 'categoryCombos',
        params: ({ ids }) => ({
            filter: `id:in:[${ids.join(',')}]`,
            fields: 'categoryOptionCombos',
            paging: 'false',
        }),
    },
}

const CATEGORY_OPTION_COMBO_QUERY = {
    categoryOptionCombos: {
        resource: 'categoryOptionCombos',
        params: ({ ids }) => ({
            filter: `id:in:[${ids.join(',')}]`,
            fields: 'displayName,categoryCombo,id,code',
            paging: 'false',
        }),
    },
}

export const useReadDataElementsWithCategoryOptionComboQuery = dataSetId => {
    const engine = useDataEngine()
    const [fetchCount, setFetchCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const refetch = () => setFetchCount(fetchCount + 1)

    useEffect(() => {
        const doFetch = async () => {
            const setSuccessfulStates = data => {
                setLoading(false)
                setError(null)
                setData(data)
            }

            setLoading(true)
            setError(null)

            try {
                setLoading(true)
                setError(null)

                const dataSetResponse = await engine.query(DATA_SET_QUERY, {
                    variables: { id: dataSetId },
                })
                const dataSets = dataSetResponse.dataSets
                const { dataSetElements } = dataSets

                if (!dataSetElements.length) {
                    setSuccessfulStates([])
                    return
                }

                const dataElementIds = dataSetElements.map(
                    ({ dataElement }) => dataElement.id
                )

                const response = await queryDataElements(engine, {
                    ids: dataElementIds,
                })
                const dataElements = response.dataElements.dataElements

                if (!dataElements.length) {
                    setSuccessfulStates([])
                    return
                }

                const categoryComboIds = dataElements
                    .map(({ categoryCombo }) => categoryCombo.id)
                    // make ids unique to avoid duplicate fetching
                    .filter(
                        (value, index, self) => self.indexOf(value) === index
                    )

                const categoryCombosResponse = await engine.query(
                    CATEGORY_COMBO_QUERY,
                    {
                        variables: { ids: categoryComboIds },
                    }
                )
                const categoryCombos =
                    categoryCombosResponse.categoryCombos.categoryCombos

                const categoryOptionComboIds = categoryCombos.reduce(
                    (acc, { categoryOptionCombos }) => {
                        const categoryOptionCombosIds = categoryOptionCombos.map(
                            ({ id }) => id
                        )

                        return [...acc, ...categoryOptionCombosIds]
                    },
                    []
                )
                const categoryOptionCombosResponse = await engine.query(
                    CATEGORY_OPTION_COMBO_QUERY,
                    {
                        variables: { ids: categoryOptionComboIds },
                    }
                )

                const categoryOptionCombosRaw =
                    categoryOptionCombosResponse.categoryOptionCombos
                        .categoryOptionCombos
                const categoryOptionCombos = categoryOptionCombosRaw.map(
                    ({ code, ...rest }) => ({
                        ...rest,
                        // only the number is needed
                        code: code.replace('COC_', ''),
                    })
                )

                const newData = dataElements.reduce((acc, dataElement) => {
                    const categoryComboId = dataElement.categoryCombo.id
                    const categoryOptionCombosForDataElement = categoryOptionCombos.filter(
                        ({ categoryCombo }) =>
                            categoryCombo.id === categoryComboId
                    )

                    if (!categoryOptionCombosForDataElement.length) {
                        const dataElementWithDefault = {
                            dataElement,
                            categoryOptionCombo: null,
                        }

                        return [...acc, dataElementWithDefault]
                    }

                    const curDataElementCombinations = categoryOptionCombosForDataElement.map(
                        categoryOptionComboForDataElement => ({
                            dataElement,
                            categoryOptionCombo: categoryOptionComboForDataElement,
                        })
                    )

                    return [...acc, ...curDataElementCombinations]
                }, [])

                setSuccessfulStates(newData)
            } catch (e) {
                setError(e)
                setLoading(false)
                console.error(e)
            }
        }

        doFetch()
    }, [fetchCount])

    return { loading, error, data, refetch }
}
