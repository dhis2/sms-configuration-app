// Returns an array of all the ids
export const getAllIds = messages => messages.map(message => message.messageId)

// Returns true if all messages are selected, false if not
export const getAllSelected = (allIds, selected) =>
    allIds.every(id => selected.includes(id))
