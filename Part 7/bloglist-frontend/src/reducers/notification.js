const defaultState = {
    text: "",
    timeout: null,
}

export const setNotification = text => async dispatch => {

    const timeout = setTimeout(
        () => dispatch({ type: "SET_NOTIFICATION", text: "" }),
        5000
    );

    dispatch({
        type: "SET_NOTIFICATION",
        text,
        timeout
    });

};

export default (state = defaultState, action) => {

    if(action.type === "SET_NOTIFICATION") {
        clearTimeout(state.timeout);
        return {
            text: action.text,
            timeout: action.timeout,
        };
    }

    return state;

}