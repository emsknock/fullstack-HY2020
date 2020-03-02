import * as anecdoteService from "../services/anecdotes";

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

export const vote = anecdote => async dispatch => {
    const { id } = await anecdoteService.vote(anecdote);
    dispatch({ type: "VOTE", id });
};
export const addAnecdote = text => async dispatch => {
    const value = await anecdoteService.create(text);
    dispatch({ type: "ADD_ANECDOTE", value });
}
export const initAnecdotes = () => async dispatch => {
    const values = await anecdoteService.getAll();
    dispatch({ type: "INIT_ANECDOTES", values });
}

export default reducer