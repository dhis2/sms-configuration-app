import { useHistory } from 'react-router'
import useGetQueryParams from './useGetQueryParams.js'

const createSearchString = params => {
    const search = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')

    return `?${search}`
}

const useSetQueryParams = () => {
    const params = useGetQueryParams()
    const history = useHistory()

    return update => {
        const merged = {
            ...params,
            ...update,
        }

        history.push({ search: createSearchString(merged) })
    }
}

export default useSetQueryParams
