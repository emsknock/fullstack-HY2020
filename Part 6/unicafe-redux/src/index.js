import React from "react";
import ReactDOM from "react-dom"
import { createStore } from "redux"
import reducer from "./reducer"

const store = createStore(reducer)

const App = () => {
    const onRate = (rating) => () => {
        store.dispatch({
            type: rating
        })
    }

    return (
        <div>
            <button onClick={onRate("GOOD")}>hyvä</button>
            <button onClick={onRate("OK")}>neutraali</button>
            <button onClick={onRate("BAD")}>huono</button>
            <button onClick={onRate("ZERO")}>nollaa tilastot</button>
            <div>hyvä {store.getState().good}</div>
            <div>neutraali {store.getState().ok}</div>
            <div>huono {store.getState().bad}</div>
        </div>
    )
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById("root"))
}

renderApp()
store.subscribe(renderApp)