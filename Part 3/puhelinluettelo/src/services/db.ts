import axios from "axios";
import { I_Person } from "../types/person";

const BASE_URL = "/api/persons";

export const getAll = (): Promise<I_Person[]> =>
    axios.get(BASE_URL)
        .then(r => r.data);

export const removePerson = (person: I_Person): Promise<I_Person[]> =>
    axios.delete(`${BASE_URL}/${person._id}`)
        .then(r => r.data);

export const newPerson = (person: Pick<I_Person, "name" | "phone">): Promise<I_Person> =>
    axios.post(`${BASE_URL}`, person)
        .then(r => r.data);

export const updatePerson = (person: I_Person): Promise<I_Person> =>
    axios.put(`${BASE_URL}/${person._id}`, person)
        .then(r => r.data);