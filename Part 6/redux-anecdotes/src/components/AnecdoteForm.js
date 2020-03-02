import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {

    const dispatch = useDispatch();
    const onAdd = async event => {
        event.preventDefault();
        const { value } = event.target.anecdote;
        event.target.anecdote.value = "";
        dispatch(addAnecdote(value));
        dispatch(setNotification(`Added "${value}"`));
    }

    return <form onSubmit={onAdd}>
        <div>
            <input type="text" name="anecdote" />
        </div>
        <input type="submit" value="create" />
    </form>

}