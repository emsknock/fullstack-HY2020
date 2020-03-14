export const save = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}
export const load = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user ? user : null;
}
export const remove = () => {
    localStorage.removeItem("user");
}