import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => (await axios.get(baseUrl)).data;

export const create = async content => {
    const newNote = {
        id: (Math.random() * 1000000).toFixed(0),
        content,
        votes: 0,
    };
    const response = await axios.post(baseUrl, newNote);
    return response.data;
}