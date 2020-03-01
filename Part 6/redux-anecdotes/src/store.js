import { createStore, combineReducers } from "redux";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import filter from "./reducers/filterReducer";

export const store = createStore(combineReducers({
    anecdotes,
    notification,
    filter,
}));