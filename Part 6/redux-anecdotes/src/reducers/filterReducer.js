const defaultState = "";

export const setFilter = text => ({ type: "SET_FILTER", text });

export default (s = defaultState, a) => {

    if(a.type === "SET_FILTER")
        return a.text;

    return s;

}