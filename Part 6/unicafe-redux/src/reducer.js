const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (s = initialState, a) => {
    switch (a.type) {
        case "GOOD":
            return { ...s, good: s.good + 1 }
        case "OK":
            return { ...s, ok: s.ok + 1 }
        case "BAD":
            return { ...s, bad: s.bad + 1 }
        case "ZERO":
            return initialState
        default: return s
    }

}

export default counterReducer