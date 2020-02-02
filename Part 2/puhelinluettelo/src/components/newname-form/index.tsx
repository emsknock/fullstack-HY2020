import React, { FC, useState } from "react";
import { I_Person } from "../../types/person";

export const NewNameForm: FC<{
    onNewName: (p: Pick<I_Person, "name" | "phone">) => void
}> = ({ onNewName }) => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNewName({ name, phone });
    }

    return <form onSubmit={onSubmit}>
        <div>
            name: <input value={name} onChange={e => setName(e.target.value)} /><br />
            phone: <input value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div>
            <input type="submit" value="Add" />
        </div>
    </form>;

}