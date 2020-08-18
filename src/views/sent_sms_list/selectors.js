export const getAllIds = messages => messages.map(message => message.id)

export const getAllSelected = (allIds, selected) =>
    allIds.every(id => selected.includes(id))
