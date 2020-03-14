import React, { useEffect } from "react";

import styled from "styled-components";
import "./App.css";

import { Switch, Route, Redirect, Link, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MainView } from "./components/Main";
import { UserView } from "./components/User";
import { UserStatsView } from "./components/Stats";

import { initialiseBlogs } from "./reducers/blogs";
import { login, initialiseUser, logout } from "./reducers/user";
import { initialiseUserStats } from "./reducers/user-stats";

import { LoginForm } from "./components/LoginForm";
import { Notification } from "./components/Notification";
import { BlogView } from "./components/Blog";

const StyledLink = styled(Link)`
    margin: 0 1rem;
`;
const Header = styled.header`
    width: 100vw;
    padding: 1rem;
    background-color: #aaf;
    display: flex;
    justify-content: space-between;
`;
const Container = styled.div`
    padding: 1rem;
`;

const App = () => {

    const dispatch = useDispatch();
    const userMatch = useRouteMatch("/users/:id");
    const blogMatch = useRouteMatch("/blogs/:id");

    const stats = useSelector(s => s.userStats);
    const blogs = useSelector(s => s.blogs);
    const auth = useSelector(s => s.user);

    const onLogin = creds => dispatch(login(creds));
    const onLogout = _ => dispatch(logout());

    useEffect(() => { dispatch(initialiseUser()) }, [dispatch]);
    useEffect(() => { auth && dispatch(initialiseBlogs()) }, [auth, dispatch]);
    useEffect(() => { auth && dispatch(initialiseUserStats()) }, [auth, dispatch]);

    const user = userMatch
        ? stats.find(u => u.id === userMatch.params.id)
        : null;
    const blog = blogMatch
        ? blogs.find(b => b.id === blogMatch.params.id)
        : null;

    return <>
        {
            auth === null
                ? <>
                    <Notification />
                    <Container>
                        <LoginForm onLogin={onLogin} />
                    </Container>
                </>
                : <>
                    <Header>
                        <span>
                            <StyledLink to="/users">Users</StyledLink>
                            <StyledLink to="/blogs">Blogs</StyledLink>
                        </span>
                        <span>
                            Logged in as {auth.name}
                            &nbsp;—&nbsp;
                            <button onClick={onLogout}>Logout</button>
                        </span>
                    </Header>
                    <Notification />
                    <Container>
                        <h1>Blog app</h1>
                        <Switch>
                            <Route path="/users/:id"><UserView user={user} /></Route>
                            <Route path="/users"><UserStatsView stats={stats} /></Route>
                            <Route path="/blogs/:id"><BlogView blog={blog} /></Route>
                            <Route path="/blogs"><MainView /></Route>
                            <Redirect to="/blogs" />
                        </Switch>
                    </Container>
                </>
        }
    </>;
}

export default App;