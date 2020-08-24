import { useLocation } from 'react-router-dom'

const useQueryParams = () => {
    const searchParams = new URLSearchParams(useLocation().search)

    return {
        status: searchParams.get('status') || 'ALL',
        page: parseInt(searchParams.get('page') || 1),
        pageSize: parseInt(searchParams.get('pageSize') || 10),
    }
}

export default useQueryParams
