describe('Testes iniciais no site Automation Exercise', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
    });

    it('Verifica o título da página', () => {
        cy.title().should('include', 'Automation Exercise');
    });

    it('Clica no botão Signup / Login', () => {
        cy.contains(' Signup / Login').click();
        cy.url().should('include', '/login');
    });

    it('Preenchendo Formulários e Submetendo', () => {
        cy.xpath("//a[normalize-space()='Signup / Login']").click();
        cy.url().should('include', '/login');

        cy.get('[data-qa="signup-name"]').type("thiagolopescury@hotmail.com");
        cy.get('[data-qa="signup-email"]').type("thiagolopescury@hotmail.com");

        cy.xpath("//button[normalize-space()='Signup']").click();

        cy.url().should('include', '/signup');
    });

    it.only('Testando Navegação no Menu', () => {
        cy.xpath("//a[@href='/products']").click();
        cy.url().should('include', '/products');
        cy.xpath("//img[@id='sale_image']").should('be.visible');
    });

});
