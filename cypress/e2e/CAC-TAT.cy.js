describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('../../src/index.html');
  });

  it('Verifica o título da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
  });

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.xpath('//*[@id="white-background"]/form/button').click();

    cy.xpath('//strong[text()="Mensagem enviada com sucesso."]')
      .should('be.visible');
  });

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns! Este é um feedback mais longo para testar a digitação rápida.', { delay: 0 });
    cy.xpath('//*[@id="white-background"]/form/button').click();

    cy.get('.error > strong')

    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="white-background"]/form/button').click();
    cy.xpath('//strong[text()="Mensagem enviada com sucesso."]')
    .should('be.visible').should('be.visible');
  });

  it('Verifique se o o campo telefone, está sendo digitado apenas numeros', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.get('#phone').type(36373177).should(($input) => {
      const value = $input.val();
      expect(value).to.match(/^\d+$/); // Verifica se contém apenas dígitos (números)
    });
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.xpath('//*[@id="white-background"]/form/button').click();

    cy.xpath('//strong[text()="Mensagem enviada com sucesso."]')
      .should('be.visible');
  });

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.get('#phone-checkbox').click();
    cy.xpath('//*[@id="white-background"]/form/button').click();

    cy.get('.error > strong').should('be.visible');

    cy.get('#phone').type(36373177).should(($input) => {
      const value = $input.val();
      expect(value).to.match(/^\d+$/); // Verifica se contém apenas dígitos (números)
    });
    cy.xpath('//*[@id="white-background"]/form/button').click();

    cy.xpath('//strong[text()="Mensagem enviada com sucesso."]')
      .should('be.visible');
  });

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago').should('have.value', 'Thiago')
      .clear().should('have.value', '');
    cy.xpath('//*[@id="lastName"]').type('Cury').should('have.value', 'Cury')
    .clear().should('have.value', '');
    cy.xpath('//*[@id="email"]').type('thiago@email.com').should('have.value', 'thiago@email.com')
    .clear().should('have.value', '');
    cy.get('#phone').type(36373177).should(($input) => {
      const value = $input.val();
      expect(value).to.match(/^\d+$/); // Verifica se contém apenas dígitos (números)
    });
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!').should('have.value', 'Gostei muito do atendimento, parabéns!')
    .clear().should('have.value', '');
    cy.xpath('//*[@id="white-background"]/form/button').click();
  });

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.xpath('//*[@id="white-background"]/form/button').click();

    cy.get('.error > strong').should('be.visible');
  });

  it('Envia o formulário com sucesso usando comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.xpath('//strong[text()="Mensagem enviada com sucesso."]').should('be.visible');
  });

  it('Envia o formulário com dados diferentes usando comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: 'Carlos',
      lastName: 'Pereira',
      email: 'carlos@email.com',
      message: 'Mensagem de teste personalizada.'
    });
    cy.xpath('//strong[text()="Mensagem enviada com sucesso."]').should('be.visible');
  });

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.get('#product').select(1).should('have.value', 'blog');
    cy.xpath("//input[@name='atendimento-tat' and @value='feedback']").check();

  });

  it('Marca cada tipo de atendimento', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.get('#product').select(1).should('have.value', 'blog');

    cy.xpath("//input[@name='atendimento-tat' and @value='ajuda' and @checked]").check()
    .should('be.checked');

    cy.xpath("//input[@name='atendimento-tat' and @value='elogio']").check()
    .should('be.checked');

    cy.xpath("//input[@name='atendimento-tat' and @value='feedback']").check()
    .should('be.checked');

  });

  it('Marca cada tipo de atendimento Dinamico', () => {
    cy.get('input[type="radio"]')
    .each(TipoDeServico => {
      cy.wrap(TipoDeServico)
      .check()
      .should('be.checked')
    })
  });

  it.only('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.xpath('//*[@id="firstName"]').type('Thiago');
    cy.xpath('//*[@id="lastName"]').type('Cury');
    cy.xpath('//*[@id="email"]').type('thiago@email.com');
    cy.xpath('//*[@id="open-text-area"]').type('Gostei muito do atendimento, parabéns!');
    cy.get('#product').select(1).should('have.value', 'blog');

    cy.xpath("//input[@name='atendimento-tat' and @value='ajuda' and @checked]").check()
    .should('be.checked');

    cy.xpath("//input[@name='atendimento-tat' and @value='elogio']").check()
    .should('be.checked');

    cy.xpath("//input[@name='atendimento-tat' and @value='feedback']").check()
    .should('be.checked');

    cy.xpath('//*[@id="email-checkbox"]').check().should('be.checked');

    cy.xpath('//*[@id="phone-checkbox"]').check().should('be.checked');

    cy.xpath('//*[@id="phone-checkbox"]').uncheck().should('not.be.checked')

  });


});