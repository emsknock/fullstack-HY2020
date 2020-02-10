import React, { FC, useState, useEffect } from "react";
import * as db from "./services/db";

import { I_Person } from "./types/person";
import { Namelist } from "./components/namelist";
import { NewNameForm } from "./components/newname-form";
import { FilterForm } from "./components/filter-form";
import { Toaster } from "./components/toaster";

export const App: FC = () => {

    const [persons, setPersons] = useState<I_Person[]>([]);
    const [filter, setFilter] = useState("");
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter));

    const hydratePersonList = () => db.getAll().then(r => setPersons(r));

    const onNewName = (newPerson: Pick<I_Person, "name" | "phone">) => {

        const collision = persons.find(p => p.name === newPerson.name);

        if (!collision)
            return db.newPerson(newPerson).then(p => {
                setPersons(s => s.concat(p));
                setSuccess(`${p.name} added`);
                setTimeout(() => setSuccess(null), 3000);
            });

        if (!window.confirm(`${newPerson.name} already exists. Update number?`))
            return;

        db.updatePerson({ ...newPerson, _id: collision._id })
            .then(n => {
                console.log(n);
                setPersons(persons.map(p => p._id === n._id ? n : p));
                setSuccess(`${n.name} updated`);
                setTimeout(() => setSuccess(null), 3000);
            })
            .catch(_ => {
                setError(`${newPerson.name} already removed from server`);
                setTimeout(() => setError(null), 3000);
            })

    };

    const onRemovePerson = (person: I_Person) =>
        db.removePerson(person).then(_ => {
            hydratePersonList();
            setSuccess(`${person.name} removed`);
            setTimeout(() => setSuccess(null), 3000);
        });

    useEffect(() => void hydratePersonList(), []);

    return <div>
        <h2>Phonebook</h2>
        <Toaster {...{ success, error }} />
        <FilterForm value={filter} onChange={setFilter} />
        <h2>Add name</h2>
        <NewNameForm onNewName={onNewName} />
        <h2>Numbers</h2>
        <Namelist persons={personsToShow} onRemovePerson={onRemovePerson} />
    </div>;

}