import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

export const AnecdoteList = () => {
    const anecdotes = useSelector(s => s);
    const dispatch = useDispatch();
    const onVote = id => dispatch(vote(id));
    return anecdotes.map(anecdote =>
        <div key={anecdote.id}>
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