const defaultState = "";

export const setNotification = text => async dispatch => {
    dispatch({ type: "SET_NOTIFICATION", text });
    setTimeout(
        () => dispatch({ type: "CLEAR_NOTIFICATION", text }),
        5000
    );
}

export default (state = defaultState, action) => {

    if (action.type === "SET_NOTIFICATION")
        return action.text;
    if (action.type === "CLEAR_NOTIFICATION")
        // Old timeouts might try to clear text that has since changed,
        // so we only clear the text if the timeout matches the current notification
        if (state === action.text)
            return "";

    return state;

}