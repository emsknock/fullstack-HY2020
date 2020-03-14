import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import notification from "./reducers/notification";
import blogs from "./reducers/blogs";
import user from "./reducers/user";
import userStats from "./reducers/user-stats";

export const store = createStore(
    combineReducers({
        notification,
        blogs,
        user,
        userStats,
    }),
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);