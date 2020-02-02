import React, { FC } from "react";
import { I_Course, I_Part } from "./types";

const Header: FC<{ course: I_Course }> = ({ course }) => <h1>{course.name}</h1>;

const Total: FC<{ course: I_Course }> = ({ course: { parts } }) => <p>
    Number of exercises: {parts.reduce((accu, { exercises }) => accu + exercises, 0)}
</p>;

const Part: FC<Pick<I_Part, "exercises" | "name">> = ({
    name, exercises
}) => <p>
        {name} {exercises}
    </p>;

const Content: FC<{ course: I_Course }> = ({ course: { parts } }) => <>
    {parts.map(({ id, ...rest }) => <Part key={id} {...rest} />)}
</>;

export const Course: FC<{ course: I_Course }> = (props) => <>
    <Header {...props} />
    <Content {...props} />
    <Total {...props} />
</>;