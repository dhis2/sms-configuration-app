// Creates a handler for toggling a single checkbox
export const createToggleHandler = ({ selected, setSelected }) => id => {
    const isSelected = selected.includes(id)

    if (isSelected) {
        const filtered = selected.filter(currentId => currentId !== id)
        return setSelected(filtered)
    }

    return setSelected([...selected, id])
}

// Create a handler for toggling all checkboxes
export const createToggleAllHandler = ({
    allSelected,
    setSelected,
    allIds,
}) => () => {
    if (allSelected) {
        return setSelected([])
    }

    return setSelected(allIds)
}

// Create a handler to remove an id from selected, for after deletion
export const createCleanSelectedHandler = ({ selected, setSelected }) => id => {
    if (selected.includes(id)) {
        const filtered = selected.filter(current => current != id)
        setSelected(filtered)
    }
}
