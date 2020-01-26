import React, { FC } from "react";
import ReactDOM from "react-dom";

interface Course {
    name: string,
    parts: Part[],
}
interface Part {
    name: string,
    exercises: number,
}

const Header: FC<{ course: Course }> = ({ course }) => <h1>{course.name}</h1>;

const Total: FC<{ course: Course }> = ({ course: { parts } }) => <p>
    Number of exercises: {parts.reduce((accu, { exercises }) => accu + exercises, 0)}
</p>;

const Content: FC<{ course: Course }> = ({ course: { parts } }) => {
    const Part: FC<Part> = ({ name, exercises }) => <p>{name} {exercises}</p>;
    return <>{parts.map(Part)}</>;
};

const App = () => {

    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10
            },
            {
                name: "Using props to pass data",
                exercises: 7
            },
            {
                name: "State of a component",
                exercises: 14
            },
        ]
    };

    return <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
    </div>;
};

ReactDOM.render(<App />, document.getElementById("root"));