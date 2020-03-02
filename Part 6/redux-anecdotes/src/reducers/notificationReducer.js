const defaultState = "";

export const setNotification = text => async dispatch => {
    dispatch({ type: "SET_NOTIFICATION", text });
    setTimeout(
        () => dispatch({ type: "SET_NOTIFICATION", text: "" }),
        5000
    );
}

export default (state = defaultState, action) => {

    if (action.type === "SET_NOTIFICATION")
        return action.text;

    return state;

}