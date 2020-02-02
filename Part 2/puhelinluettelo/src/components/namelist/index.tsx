import React, { FC } from "react";
import { I_Person } from "../../types/person";

export const Namelist: FC<{
    persons: I_Person[],
    onRemovePerson: (person: I_Person) => void,
}> = ({
    persons,
    onRemovePerson,
}) => <div>{
    persons.map(
        p => <div key={p.name}>
            {p.name} • {p.phone}
            <button onClick={() => onRemovePerson(p)}>Remove</button>
        </div>
    )
}</div>;