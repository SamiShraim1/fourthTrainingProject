/* eslint-env cypress */
describe("Forms", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#cardSetPage").click();
  });

  it("shows error if Create Set submitted empty", () => {
    cy.get('[data-cy="toggle_form"]').click();     // افتح الفورم
    cy.get('[data-cy="set_form"]').within(() => {
      cy.root().trigger("submit");                 // إرسال بدون مدخلات
    });
    cy.get(".error").should("contain.text", "TITLE CANNOT BE EMPTY");
  });
});
