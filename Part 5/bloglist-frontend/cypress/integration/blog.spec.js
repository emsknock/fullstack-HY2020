describe("Blog app", function () {

    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/testing/reset");
        cy.request("POST", "http://localhost:3001/api/users", {
            username: "foobar",
            password: "hunter2",
            name: "Foo Bar"
        });
        cy.visit("http://localhost:3000");
    });

    it("shows the login form first", function () {
        cy.contains("Username");
        cy.contains("Password");
        cy.contains("Login");
    });

    describe("Login", function () {

        it("succeeds with correct creds", function () {
            cy.get("#username").type("foobar");
            cy.get("#password").type("hunter2");
            cy.get("#login-btn").click();

            cy.contains("Blogs");
        });

        it("fails with wrong creds", function () {
            cy.get("#username").type("abc123");
            cy.get("#password").type("password");
            cy.get("#login-btn").click();

            cy.contains("Incorrect credentials");
        });

    });

    describe.only("When logged in", function () {

        beforeEach(function () {
            cy.get("#username").type("foobar");
            cy.get("#password").type("hunter2");
            cy.get("#login-btn").click();
        });

        it.skip("a blog can be created", function () {
            cy.contains("New Blog").click();
            cy.get("#new-blog-title").type("Cypress Title");
            cy.get("#new-blog-author").type("Cypress Author");
            cy.get("#new-blog-url").type("http://example.com/cypress");
            cy.get("#new-blog-submit").click();

            // NB: em dash
            cy.contains("Created: Cypress Title");
        });

        it.skip("can create and like blogs", function () {
            cy.contains("New Blog").click();
            cy.get("#new-blog-title").type("Cypress Title");
            cy.get("#new-blog-author").type("Cypress Author");
            cy.get("#new-blog-url").type("http://example.com/cypress");
            cy.get("#new-blog-submit").click();

            cy.contains("show").click();
            cy.contains("0 likes");
            cy.contains("Like").click()
            cy.contains("1 likes");
        });

        it("lists blogs in order of likes", function () {

            cy.contains("New Blog").click();
            cy.get("#new-blog-title").type("Cypress Title");
            cy.get("#new-blog-author").type("Cypress Author");
            cy.get("#new-blog-url").type("http://example.com/cypress");
            cy.get("#new-blog-submit").click();

            cy.contains("New Blog").click();
            cy.get("#new-blog-title").type("Cypress Title 2");
            cy.get("#new-blog-author").type("Cypress Author");
            cy.get("#new-blog-url").type("http://example.com/cypress");
            cy.get("#new-blog-submit").click();

            cy.contains("Created: Cypress Title 2");

            cy.get(".blog").last().contains("show").click();
            cy.contains("Like").click();
            cy.contains("hide").click();
            cy.get(".blog").first().contains("show").click();
            cy.get(".blog").first().contains("1 likes");

        });

    })

})