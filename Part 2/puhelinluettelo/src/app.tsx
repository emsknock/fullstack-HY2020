import React, { FC, useState, useEffect } from "react";
import * as db from "./services/db";

import { I_Person } from "./types/person";
import { Namelist } from "./components/namelist";
import { NewNameForm } from "./components/newname-form";
import { FilterForm } from "./components/filter-form";

export const App: FC = () => {

    const [persons, setPersons] = useState<I_Person[]>([]);
    const [filter, setFilter] = useState("");

    const personsToShow = persons.filter(p => p.name.toLowerCase().includes(filter));

    const hydratePersonList = () => db.getAll().then(r => setPersons(r));

    const onNewName = (newPerson: Pick<I_Person, "name" | "phone">) => {

        const collision = persons.find(p => p.name === newPerson.name);

        if (!collision)
            return db.newPerson(newPerson).then(p => setPersons(s => s.concat(p)));

        if (!window.confirm(`${newPerson.name} already exists. Update number?`))
            return;

        db.updatePerson({ ...newPerson, id: collision.id })
            .then(n => setPersons(persons.map(p => p.id === n.id ? n : p)));
        
    };

    const onRemovePerson = (person: I_Person) =>
        db.removePerson(person).then(hydratePersonList);

    useEffect(() => void hydratePersonList(), []);

    return <div>
        <h2>Phonebook</h2>
        <FilterForm value={filter} onChange={setFilter} />
        <h2>Add name</h2>
        <NewNameForm onNewName={onNewName} />
        <h2>Numbers</h2>
        <Namelist persons={personsToShow} onRemovePerson={onRemovePerson} />
    </div>;

}