import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { NewBlogForm } from "./NewBlogForm";

describe(
    "New Blog Form",
    () => {
        test("renders with fields hidden by default", () => {

            const mockHandler = jest.fn();
            const component = render(
                <NewBlogForm onCreate={mockHandler} />
            );

            const inputs = component.container.querySelectorAll("input");
            const form = component.container.querySelector("form");

            fireEvent.change(inputs[0], { target: { value: 'Mock Title' } });
            fireEvent.change(inputs[1], { target: { value: 'Mock Author' } });
            fireEvent.change(inputs[2], { target: { value: 'Mock URL' } });

            fireEvent.submit(form);

            expect(mockHandler.mock.calls[0][0]).toEqual(
                { title: "Mock Title", author: "Mock Author", url: "Mock URL" }
            );

        });
    }
);