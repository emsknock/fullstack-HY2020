import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";
import * as anecdoteService from "../services/anecdotes";

export const AnecdoteForm = () => {

    const dispatch = useDispatch();
    const onAdd = async event => {
        event.preventDefault();
        const { value } = event.target.anecdote;
        event.target.anecdote.value = "";
        const newNote = await anecdoteService.create(value);
        console.log(newNote);
        dispatch(addAnecdote(newNote));
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