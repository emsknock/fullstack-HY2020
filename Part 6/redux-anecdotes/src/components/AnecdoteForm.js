import React from "react";
import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Component = (p) => {

    const onAdd = async event => {
        event.preventDefault();
        const { value } = event.target.anecdote;
        event.target.anecdote.value = "";
        p.addAnecdote(value);
        p.setNotification(`Added "${value}"`);
    }

    return <form onSubmit={onAdd}>
        <div>
            <input type="text" name="anecdote" />
        </div>
        <input type="submit" value="create" />
    </form>

}

export const AnecdoteForm = connect(
    null,
    {
        addAnecdote,
        setNotification
    }
)(Component);