export const createInitialValues = ({
    name,
    parserType,
    receivedMessage,
    userGroup,
}) => ({
    name,
    parserType,
    receivedMessage,
    userGroup: userGroup.id,
})
