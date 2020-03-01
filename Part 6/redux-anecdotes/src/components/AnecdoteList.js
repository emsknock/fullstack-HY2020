import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification, clearNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
    const anecdotes = useSelector(s => s.anecdotes);
    const filter = useSelector(s => s.filter);
    const dispatch = useDispatch();
    const onVote = id => {
        dispatch(vote(id));
        dispatch(setNotification(`Voted for "${anecdotes.find(a => a.id === id).content}"`));
        setTimeout(() => {
            dispatch(clearNotification());
        }, 5000);
    }
    return anecdotes.map(anecdote =>
        !anecdote.content.includes(filter)
            ? null
            : <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => onVote(anecdote.id)}>vote</button>
                </div>
            </div>
    );
}