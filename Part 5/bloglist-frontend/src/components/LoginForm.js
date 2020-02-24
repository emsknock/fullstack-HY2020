import React, { useState } from "react";
import PropTypes from "prop-types";

export const LoginForm = ({ onLogin }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ username, password });
    }

    return <form onSubmit={handleSubmit}>
        <div>
            <span>Username: </span>
            <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
            <span>Password: </span>
            <input
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <input type="submit" value="Login" />
    </form>

}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired
}