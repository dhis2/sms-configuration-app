export const getAllIds = messages => messages.map(message => message.id)

export const getIsEverythingSelected = (allIds, selected) =>
    allIds.every(id => selected.includes(id))
