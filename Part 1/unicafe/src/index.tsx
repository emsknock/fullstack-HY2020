import React, { FC, useState } from "react";
import ReactDOM from "react-dom";

const Button: FC<{
    children: string,
    incrementer: React.Dispatch<React.SetStateAction<number>>,
}> = ({
    children, incrementer
}) => <button onClick={() => incrementer(n => n + 1)}>
            {children}
        </button>;

const StatsLine: FC<{
    label: string,
    value: number | string,
}> = ({
    label, value,
}) => <tr>
            <td>{label}:</td>
            <td>{value}</td>
        </tr>;

const Stats: FC<{
    good: number,
    neutral: number,
    bad: number
}> = ({
    good, neutral, bad,
}) => {
        const all = good + neutral + bad;
        return all === 0
            ? <div>No feedback given</div>
            : <table>
                <tbody>
                    <StatsLine label="Good" value={good} />
                    <StatsLine label="Neutral" value={neutral} />
                    <StatsLine label="Bad" value={bad} />
                    <StatsLine label="All" value={all} />
                    <StatsLine
                        label="Avg"
                        value={((good + bad * -1) / all).toFixed(2)}
                    />
                    <StatsLine
                        label="Positive"
                        value={`${(100 * good / all).toFixed(2)} %`}
                    />
                </tbody>
            </table>;
    };

const App: FC = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return <>
        <h1>Unicafe feedback</h1>
        <Button incrementer={setGood}>Good</Button>
        <Button incrementer={setNeutral}>Neutral</Button>
        <Button incrementer={setBad}>Bad</Button>
        <h2>Statistics:</h2>
        <Stats {...{ good, neutral, bad }} />
    </>;

}

ReactDOM.render(<App />, document.getElementById("root"));