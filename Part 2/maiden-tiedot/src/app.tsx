import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { I_Country } from "./types/country";
import { FilterForm } from "./components/filter-form";
import { Country } from "./components/country";
import { ShowCandidates } from "./components/candidates";

/** Transforms a country object from the API to match this app's interface */
const parseCountry = (c: any): I_Country => ({
    name: c.name,
    capital: c.capital,
    population: c.population,
    flagSrc: c.flag,
    languages: c.languages.map((l: any) => l.name),
})

export const App: FC = () => {

    const [data, setData] = useState<I_Country[]>([]);
    const [filter, setFilter] = useState("");
    const [candidates, setCandidates] = useState<I_Country[]>([]);

    useEffect(
        () => {
            axios.get("https://restcountries.eu/rest/v2/all")
                .then(r => r.data.map(parseCountry))
                .then(r => setData(r));
        },
        []
    );

    useEffect(
        () => setCandidates(
            data.filter(c => c.name.toLowerCase().includes(filter.toLowerCase())) ?? []
        ),
        [data, filter]
    );

    return <>
        <h1>Country search</h1>
        <FilterForm value={filter} onChange={setFilter} />
        {
            candidates.length === 1
                ? <Country {...candidates[0]} />
                : <ShowCandidates candidates={candidates} setFilter={setFilter} />
        }
    </>;
}
