import axios from "axios";
const baseUrl = "/api/blogs";

let auth = null;
const setToken = newToken => { auth = `bearer ${newToken}` };

const getAll = async () => {
    const { data } = await axios.get(baseUrl, { headers: { Authorization: auth } });
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

const update = async (blog) => {
    if (!auth) throw Error("No auth set!");
    await axios.put(
        `${baseUrl}/${blog.id}`,
        { ...blog, user: blog.user.id },
        { headers: { Authorization: auth } }
    );
    return blog;
}

export default { getAll, setToken, create, update }