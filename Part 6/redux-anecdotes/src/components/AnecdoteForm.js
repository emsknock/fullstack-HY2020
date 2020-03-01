import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";

export const AnecdoteForm = () => {

    const dispatch = useDispatch();
    const onAdd = (event) => {
        event.preventDefault();
        const { value } = event.target.anecdote;
        event.target.anecdote.value = "";
        dispatch(addAnecdote(value));
    }

    return <form onSubmit={onAdd}>
        <div>
            <input type="text" name="anecdote" />
        </div>
        <input type="submit" value="create" />
    </form>

}