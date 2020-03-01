const defaultState = [];

const reducer = (state = defaultState, action) => {
    
    if (action.type === "VOTE")
        return state.map(
            anecdote => anecdote.id !== action.id
                ? anecdote
                : { ...anecdote, votes: anecdote.votes + 1 }
        ).sort((a, b) => b.votes - a.votes)

    if (action.type === "ADD_ANECDOTE")
        return [
            ...state,
            action.value
        ];

    if (action.type === "INIT_ANECDOTES")
        return action.values;

    return state;
    
}

export const vote = (id) => ({ type: "VOTE", id });
export const addAnecdote = (value) => ({ type: "ADD_ANECDOTE", value });
export const initAnecdotes = (values) => ({ type: "INIT_ANECDOTES", values });

export default reducer