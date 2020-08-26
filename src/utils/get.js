export const get = (path, object) => {
    let value = null
    const segments = path.split('.')

    if (!(object instanceof Object)) {
        return value
    }

    for (let i = 0, cur = object; i < segments.length; ++i) {
        const nextObject = cur[segments[i]]
        if (!nextObject) break

        if (i === segments.length - 1) {
            value = nextObject
            break
        }

        cur = nextObject
    }

    return value
}
