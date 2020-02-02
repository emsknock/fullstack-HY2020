import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import { I_Person } from "./types/person";
import { Namelist } from "./components/namelist";
import { NewNameForm } from "./components/newname-form";
import { FilterForm } from "./components/filter-form";

export const App: FC = () => {

    const [persons, setPersons] = useState<I_Person[]>([]);
    const [filter, setFilter] = useState("");

    const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter));

    const onNewName = (newPerson: I_Person) => {
        if(persons.some(p => p.name === newPerson.name))
            return alert(`${newPerson.name} is already in the phonebook!`);

        setPersons(s => s.concat(newPerson));
    };

    useEffect(() => {
        axios.get("http://localhost:3001/persons")
            .then(r => setPersons(r.data));
    }, []);

    return <div>
        <h2>Phonebook</h2>
        <FilterForm value={filter} onChange={setFilter} />
        <h2>Add name</h2>
        <NewNameForm onNewName={onNewName} />
        <h2>Numbers</h2>
        <Namelist persons={personsToShow} />
      </div>;

}