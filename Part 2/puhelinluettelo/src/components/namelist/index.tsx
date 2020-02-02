import React, { FC } from "react";
import { I_Person } from "../../types/person";

export const Namelist: FC<{ persons: I_Person[] }> = ({ persons }) => <div>
    {persons.map(p => <div key={p.name}>{p.name} • {p.phone}</div>)}
</div>;