import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledDiv = styled.div`
    background-color: #ffa;
    padding: 0.5rem;
    border: 1px solid black;
`;

export const Notification = () => {

    const notification = useSelector(s => s.notification.text);

    return notification
        ? <StyledDiv>{notification}</StyledDiv>
        : null;

}