import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {

    const dispatch = useDispatch();
    const onAdd = (event) => {
        event.preventDefault();
        const { value } = event.target.anecdote;
        event.target.anecdote.value = "";
        dispatch(addAnecdote(value));
        dispatch(setNotification(`Added "${value}"`));
        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    }

    return <form onSubmit={onAdd}>
        <div>
            <input type="text" name="anecdote" />
        </div>
        <input type="submit" value="create" />
    </form>

}