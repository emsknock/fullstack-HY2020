import React from "react";
import { AnecdoteForm } from "./components/AnecdoteForm";
import { AnecdoteList } from "./components/AnecdoteList";
import { Notification } from "./components/Notification";
import { FilterForm } from "./components/FilterForm";

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification />
            <FilterForm />
            <AnecdoteList />
            <h2>Create new</h2>
            <AnecdoteForm />
        </div>
    )
}

export default App