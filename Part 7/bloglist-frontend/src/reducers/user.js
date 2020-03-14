import axios from "axios";
import * as storageUser from "../utils/storage-user";
import { setNotification } from "./notification";

const BASE_URL = "/api/login";
const defaultState = null;

export const initialiseUser = () => async dispatch => {
    const data = storageUser.load();
    if (data === null) return;
    dispatch({
        type: "SET_USER",
        data,
    });
};
export const login = (credentials) => async dispatch => {
    try {
        const { data } = await axios.post(BASE_URL, credentials);
        storageUser.save(data);
        dispatch({
            type: "SET_USER",
            data,
        });
    } catch (e) {
        dispatch(setNotification("Failed to log in"));
    }
};
export const logout = () => async dispatch => {
    storageUser.remove();
    dispatch({
        type: "SET_USER",
        data: null,
    });
};

export default (state = defaultState, action) => {

    if (action.type === "SET_USER")
        return action.data;

    return state;

}