/* eslint-env cypress */
describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("goes to Home", () => {
    cy.get("#homePage").click();
    cy.get('[data-cy="home_header"]').should("contain.text", "Study Night");
  });

  it("goes to About", () => {
    cy.get("#aboutPage").click();
    cy.get('[data-cy="about_page"]').should("contain.text", "About Study Night");
  });

  it("goes to Card Sets", () => {
    cy.get("#cardSetPage").click();
    cy.get('[data-cy="study-set-header"]').should("contain.text", "Study Set Library");
  });
});
