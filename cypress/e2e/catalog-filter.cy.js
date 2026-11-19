describe("Filtro de catálogo en NoirTech", () => {
  it("permite filtrar productos por categoría", () => {
    cy.visit("/");

    cy.contains("Catálogo de productos", { timeout: 10000 }).should(
      "be.visible",
    );
    cy.get("#categoryFilter", { timeout: 10000 }).should("exist");

    cy.get(".product-card", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0,
    );

    cy.get("#categoryFilter").select("laptops");

    cy.get(".results-count").should("contain.text", "producto(s)");
    cy.get(".product-card", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0,
    );

    cy.get(".product-category").each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          expect(text.trim().toLowerCase()).to.include("laptops");
        });
    });

    cy.get("#categoryFilter").select("all");

    cy.get(".product-card", { timeout: 10000 }).should(
      "have.length.greaterThan",
      0,
    );
  });
});
