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
            <input id="username" value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
            <span>Password: </span>
            <input
                id="password"
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
            />
        </div>
        <input id="login-btn" type="submit" value="Login" />
    </form>

}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired
}