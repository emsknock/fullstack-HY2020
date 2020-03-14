import React, { useState } from "react";
import styled from "styled-components";
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
        <button id="login-btn" type="submit">Login</button>
    </form>

}

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired
}