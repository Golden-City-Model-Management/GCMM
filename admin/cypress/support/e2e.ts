
import './commands'
Cypress.on('uncaught:exception', () => {
  return false
})

Cypress.Commands.add('dataCy', (dataTestId) => {
   cy.get(`[data-testid="${dataTestId}"]`)
})
Cypress.Commands.add('login', ({email, password}: {email: string, password: string}) => { 
    cy.request({
      url: `${Cypress.env('CYPRESS_SERVER_URL')}/users/login`,
      method: 'POST',
      body: { userName: email, password },
    }).then((res) => { 
      cy.setCookie("access_token", res.body.token);
    });
      cy.getCookie("access_token").should("exist");
})