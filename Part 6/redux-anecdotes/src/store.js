import { createStore, combineReducers } from "redux";
import anecdotes, { initAnecdotes } from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import filter from "./reducers/filterReducer";

import * as anecdoteService from "./services/anecdotes";

export const store = createStore(combineReducers({
    anecdotes,
    notification,
    filter,
}));

anecdoteService.getAll().then(values => store.dispatch(initAnecdotes(values)))