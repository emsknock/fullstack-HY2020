import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe(
    "Blog Component",
    () => {
        test("renders with fields hidden by default", () => {

            const blog = {
                title: "Test Title",
                author: "Test Author",
                url: "http://example.com",
                likes: 1337,
                user: {
                    id: "0",
                    name: "Test Name"
                }
            };

            const component = render(
                <Blog blog={blog} />
            );

            expect(component.container.textContent.includes("Test Title — Test Author"))
                .toBe(true);
            expect(component.container.textContent.includes("http://example.com"))
                .toBe(false);
            expect(component.container.textContent.includes("1337 likes"))
                .toBe(false);

        });

        test("renders additional fields on button click", () => {

            const blog = {
                title: "Test Title",
                author: "Test Author",
                url: "http://example.com",
                likes: 1337,
                user: {
                    id: "0",
                    name: "Test Name"
                }
            };

            const component = render(
                <Blog blog={blog} />
            );

            const btn = component.container.querySelector("button");
            fireEvent.click(btn);

            expect(component.container.textContent.includes("Test Title — Test Author"))
                .toBe(true);
            expect(component.container.textContent.includes("http://example.com"))
                .toBe(true);
            expect(component.container.textContent.includes("1337 likes"))
                .toBe(true);
            expect(component.container.textContent.includes("Test Name"))
                .toBe(true);

        });

        test("calls the like function on clicks", () => {

            const blog = {
                title: "Test Title",
                author: "Test Author",
                url: "http://example.com",
                likes: 1337,
                user: {
                    id: "0",
                    name: "Test Name"
                }
            };

            const mockHandler = jest.fn();
            const component = render(
                <Blog blog={blog} onLike={mockHandler} />
            );
            
            const btn = component.container.querySelector("button");
            fireEvent.click(btn);

            const likeBtn = component.getByText("Like");
            fireEvent.click(likeBtn);
            fireEvent.click(likeBtn);
            expect(mockHandler.mock.calls.length).toBe(2);

        });
    }
);