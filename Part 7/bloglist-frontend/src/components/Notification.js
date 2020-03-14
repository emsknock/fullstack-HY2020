import React from "react";
import { useSelector } from "react-redux";

export const Notification = () => {

    const notification = useSelector(s => s.notification.text);

    return notification
        ? <div>{notification}</div>
        : null;

}