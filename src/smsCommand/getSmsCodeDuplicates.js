export const getSmsCodeDuplicates = smsCodes => {
    const duplicates = smsCodes.reduce((curDuplicates, smsCode, index) => {
        const [name, code] = smsCode

        const errorAlreadyPresent = curDuplicates.includes(name)
        if (errorAlreadyPresent) {
            return curDuplicates
        }

        const potentialDuplicates = smsCodes.filter(
            // eslint-disable-next-line no-unused-vars
            ([_, curCode], curIndex) => {
                return curCode.code === code.code && curIndex !== index
            }
        )

        const noDuplicates = !potentialDuplicates.length

        if (noDuplicates) {
            return curDuplicates
        }

        const newlyFoundDuplicates = potentialDuplicates.reduce(
            (curWithCodeDuplicates, [curName]) => {
                return [...curWithCodeDuplicates, curName]
            },
            [name]
        )

        return [...curDuplicates, ...newlyFoundDuplicates]
    }, [])

    return duplicates
}
