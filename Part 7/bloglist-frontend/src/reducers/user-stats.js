import axios from "axios";

const BASE_URL = "/api/users";
const defaultState = [];

export const initialiseUserStats = () => async dispatch => {
    const {data} = await axios.get(BASE_URL);
    dispatch({
        type: "SET_USERSTATS",
        data,
    });
};

export default (state = defaultState, action) => {

    if (action.type === "SET_USERSTATS")
        return action.data;

    return state;

}