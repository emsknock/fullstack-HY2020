import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteList = () => {
    const anecdotes = useSelector(s => s.anecdotes);
    const filter = useSelector(s => s.filter);
    const dispatch = useDispatch();
    const onVote = anecdote => {
        dispatch(vote(anecdote));
        dispatch(setNotification(`Voted for "${anecdotes.find(a => a.id === anecdote.id).content}"`));
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
                    <button onClick={() => onVote(anecdote)}>vote</button>
                </div>
            </div>
    );
}