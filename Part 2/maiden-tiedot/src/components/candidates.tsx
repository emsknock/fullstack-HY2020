import React, { FC } from "react";
import { I_Country } from "../types/country";

export const ShowCandidates: FC<{
    candidates: I_Country[],
    setFilter: (name: string) => void,
}> = ({
    candidates,
    setFilter,
}) => {
    if (candidates.length === 0)
        return <div>No matching countries</div>;

    if (candidates.length > 10)
        return <div>Too many matches! Please specify your search.</div>

    return <ul>
        {
            candidates.map(
                ({ name }) => <li key={name}>
                    {name}
                    <button onClick={() => setFilter(name)}>Show</button>
                </li>
            )
        }
    </ul>;
}