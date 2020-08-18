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
