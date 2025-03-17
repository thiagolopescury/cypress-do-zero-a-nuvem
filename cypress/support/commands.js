// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {}) => {
    const {
      firstName = 'Thiago',
      lastName = 'Cury',
      email = 'thiago@email.com',
      message = 'Gostei muito do atendimento, parabéns!'
    } = data;
  
    cy.xpath('//*[@id="firstName"]').type(firstName);
    cy.xpath('//*[@id="lastName"]').type(lastName);
    cy.xpath('//*[@id="email"]').type(email);
    cy.xpath('//*[@id="open-text-area"]').type(message);
    cy.xpath('//*[@id="white-background"]/form/button').click();
  });