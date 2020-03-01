const defaultState = "";

export const setNotification = (text) => ({ type: "SET_NOTIFICATION", text });
export const clearNotification = () => ({ type: "SET_NOTIFICATION", text: "" });

export default (state = defaultState, action) => {

    if (action.type === "SET_NOTIFICATION")
        return action.text;

    return state;

}