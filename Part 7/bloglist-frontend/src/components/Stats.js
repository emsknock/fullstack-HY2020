import React from "react";
import { Link } from "react-router-dom";

export const UserStatsView = ({ stats }) => <>
    <h1>Users</h1>
    <table>
        <tbody>
            <tr>
                <th />
                <th>Blogs created</th>
            </tr>
            {stats.map(u =>
                <tr key={u.username}>
                    <td><Link to={`/users/${u.id}`}>{u.name}</Link></td>
                    <td>{u.blogs.length}</td>
                </tr>
            )}
        </tbody>
    </table>
</>;