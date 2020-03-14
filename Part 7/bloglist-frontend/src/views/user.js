import React from "react";

export const UserView = ({ user }) => {
    if (!user) return null;
    return <>
        <h1>{user.name}</h1>
        <h2>Added blogs</h2>
        {user.blogs.length === 0
            ? <div>No blogs</div>
            : <ul>
                {
                    user.blogs.map(
                        b => <li>{b.title}</li>
                    )
                }
            </ul>
        }
    </>
};