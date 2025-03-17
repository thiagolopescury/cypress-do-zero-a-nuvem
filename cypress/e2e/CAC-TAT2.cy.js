describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('../../src/index.html');
  });

  it('Verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.contains('label', 'Nome').type('Thiago');
    cy.contains('label', 'Sobrenome').type('Cury');
    cy.contains('label', 'E-mail').type('thiago@email.com');
    cy.contains('label', 'Como podemos te ajudar?').type('Gostei muito do atendimento, parabéns!');
    cy.contains('button', 'Enviar').click();

    cy.contains('strong', 'Mensagem enviada com sucesso.').should('be.visible');
  });

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.contains('label', 'Nome').type('Thiago');
    cy.contains('label', 'Sobrenome').type('Cury');
    cy.contains('label', 'E-mail').type('thiago');
    cy.contains('label', 'Como podemos te ajudar?').type('Gostei muito do atendimento, parabéns! Este é um feedback mais longo para testar a digitação rápida.', { delay: 0 });
    cy.contains('button', 'Enviar').click();

    cy.contains('strong', 'Valide os campos obrigatórios!').should('be.visible');

    cy.contains('label', 'E-mail').clear().type('thiago@email.com');
    cy.contains('button', 'Enviar').click();

    cy.contains('strong', 'Mensagem enviada com sucesso.').should('be.visible');
  });

  it('Verifica se o campo telefone está sendo digitado apenas com números', () => {
    cy.contains('label', 'Nome').type('Thiago');
    cy.contains('label', 'Sobrenome').type('Cury');
    cy.contains('label', 'E-mail').type('thiago@email.com');
    cy.get('#phone').type(36373177).should(($input) => {
      const value = $input.val();
      expect(value).to.match(/^\d+$/);
    });
    cy.contains('label', 'Como podemos te ajudar?').type('Gostei muito do atendimento, parabéns!');
    cy.contains('button', 'Enviar').click();

    cy.contains('strong', 'Mensagem enviada com sucesso.').should('be.visible');
  });

  it('Exibe mensagem de erro quando o telefone é obrigatório mas não é preenchido', () => {
    cy.contains('label', 'Nome').type('Thiago');
    cy.contains('label', 'Sobrenome').type('Cury');
    cy.contains('label', 'E-mail').type('thiago@email.com');
    cy.contains('label', 'Como podemos te ajudar?').type('Gostei muito do atendimento, parabéns!');
    cy.get('#phone-checkbox').click();
    cy.contains('button', 'Enviar').click();

    cy.contains('strong', 'Valide os campos obrigatórios!').should('be.visible');

    cy.get('#phone').type(36373177).should(($input) => {
      const value = $input.val();
      expect(value).to.match(/^\d+$/);
    });
    cy.contains('button', 'Enviar').click();

    cy.contains('strong', 'Mensagem enviada com sucesso.').should('be.visible');
  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.contains('label', 'Nome').type('Thiago').should('have.value', 'Thiago')
      .clear().should('have.value', '');
    cy.contains('label', 'Sobrenome').type('Cury').should('have.value', 'Cury')
      .clear().should('have.value', '');
    cy.contains('label', 'E-mail').type('thiago@email.com').should('have.value', 'thiago@email.com')
      .clear().should('have.value', '');
    cy.get('#phone').type(36373177).should(($input) => {
      const value = $input.val();
      expect(value).to.match(/^\d+$/);
    });
    cy.contains('label', 'Como podemos te ajudar?').type('Gostei muito do atendimento, parabéns!')
      .should('have.value', 'Gostei muito do atendimento, parabéns!')
      .clear().should('have.value', '');
    cy.contains('button', 'Enviar').click();
  });

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();

    cy.contains('strong', 'Valide os campos obrigatórios!').should('be.visible');
  });

});
