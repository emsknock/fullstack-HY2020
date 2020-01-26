import React, { useState, FC } from "react";
import ReactDOM from "react-dom";

const PickMostVoted: FC<{ values: any[], votes: number[] }> = ({ values, votes }) => {
    const maxVotes = Math.max(...votes);
    const idx = votes.indexOf(maxVotes);
    const value = values[idx];
    return value;
};

const App: FC<{ anecdotes: string[] }> = ({ anecdotes }) => {

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState<number[]>(Array(anecdotes.length).fill(0));

    const vote = () => setVotes(oldState => {
        const stateCopy = [...oldState];
        stateCopy[selected] += 1;
        return stateCopy;
    });

    const next = () =>
        setSelected(n => (n + 1) % anecdotes.length);

    return <>
        <h1>Anecdotes</h1>

        <div>{anecdotes[selected]}</div>
        <div>Has {votes[selected]} votes</div>

        <button onClick={vote}>Vote</button>
        <button onClick={next}>Next</button>

        <h2>Anecdote with most votes</h2>
        <PickMostVoted values={anecdotes} votes={votes} />

    </>;

}

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById("root")
);