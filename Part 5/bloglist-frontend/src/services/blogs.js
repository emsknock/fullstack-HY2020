import axios from "axios";
const baseUrl = "/api/blogs";

let auth = null;
const setToken = newToken => { auth = `bearer ${newToken}` };

const getAll = async () => {
    const { data } = await axios.get(baseUrl, { headers: { Authorization: auth } });
    console.log(data);
    return data;
}

const create = async (blog) => {
    if (!auth) throw Error("No auth set!");
    const response = await axios.post(
        baseUrl,
        blog,
        { headers: { Authorization: auth } }
    );
    return response.data;
}

export default { getAll, setToken, create }