import { useDataMutation } from '@dhis2/app-runtime'

const DELETE_OUTBOUND_SMS_MUTATION = {
    resource: 'sms/outbound',
    type: 'delete',
    params: ({ ids }) => ({ ids }),
}

export const useDeleteMutation = ({ onComplete, onError }) =>
    useDataMutation(DELETE_OUTBOUND_SMS_MUTATION, {
        onComplete,
        onError,
    })
