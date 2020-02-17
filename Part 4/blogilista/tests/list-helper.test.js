const { totalLikes, favouriteBlog } = require("../utils/list-helper");
const { initialBlogs } = require("./blog-helper");

describe(
    "Total Likes",
    () => {

        test(
            "of an empty list is zero",
            () => expect(totalLikes([])).toBe(0)
        );

        test(
            "of a single blog equals its like count",
            () => expect(totalLikes([blogs[0]])).toBe(7)
        );

        test(
            "is calculated correctly for a list",
            () => expect(totalLikes(blogs)).toBe(36)
        );

    }
);

describe(
    "Favourite Blog",
    () => {

        test(
            "is undefined for an empty list",
            () => expect(favouriteBlog([])).toBe(undefined)
        );

        test(
            "from a list with a single blog is that blog",
            () => expect(favouriteBlog([blogs[0]])).toEqual(blogs[0])
        );

        test(
            "is found correctly for a list of blogs",
            () => expect(favouriteBlog(blogs)).toEqual(blogs[2])
        )

    }
);