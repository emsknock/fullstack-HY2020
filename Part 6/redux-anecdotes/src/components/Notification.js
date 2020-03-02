import React from "react";
import { connect } from "react-redux";

const Component = ({ text }) => {

    if(!text) return null;

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    };
    return <div style={style}>
        {text}
    </div>;

}

export const Notification = connect(s => ({ text: s.notification.text }))(Component);