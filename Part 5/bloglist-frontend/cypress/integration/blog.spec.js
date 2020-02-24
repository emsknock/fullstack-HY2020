describe("Blog app", function () {

    beforeEach(function () {
        cy.request("POST", "http://localhost:3001/api/testing/reset");
        cy.request("POST", "http://localhost:3001/api/users", {
            username: "foobar",
            password: "hunter2",
            name: "Foo Bar"
        });
        cy.visit("http://localhost:3001");
    });

    it("shows the login form first", function () {
        cy.contains("Username");
        cy.contains("Password");
        cy.contains("Login");
    });

})