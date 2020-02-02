import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { I_Country } from "../types/country";

interface I_Weather {
    temp: number,
    wind: string,
    imgs: string[],
}

const parseWeather = (w: any): I_Weather => ({
    temp: w.temperature,
    wind: `${w.wind_speed} km/h to ${w.wind_dir}`,
    imgs: w.weather_icons,
});

export const Country: FC<I_Country> = (c) => {

    const [weather, setWeather] = useState<I_Weather>();

    useEffect(
        () => {
            axios.get(
                `/current?access_key=${process.env.REACT_APP_API_KEY}&query=${c.capital}`
            )
            .then(r => r.data.current)
            .then(parseWeather)
            .then(setWeather);
        },
        [c.name, c.capital]
    );

    return <div>

        <h1>{c.name}</h1>

        <div>Capital: {c.capital}</div>
        <div>Population: {c.population}</div>

        <h2>Languages</h2>
        <ul>
            {
                c.languages.map(
                    lang => <li key={lang}>{lang}</li>
                )
            }
        </ul>

        <img src={c.flagSrc} style={{ maxWidth: 300 }} alt={`The flag of ${c.name}`} />

        <h2>Weather in {c.capital}</h2>
        {weather?.temp && <div>Temperature: {weather.temp}°C</div>}
        {weather?.wind && <div>Wind: {weather.wind}</div>}
        {weather?.imgs.map(i => <img key={i} src={i} alt="" />)}

    </div>
}