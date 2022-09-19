// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import * as NextRouter from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import ContextProvider from '@/reducers/provider'

import { mount } from 'cypress/react'

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.

beforeEach(() => {
  const asPath = '/'
  cy.stub(NextRouter, 'useRouter').returns({ asPath })
})

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add('mount', (component, options = {}) => {
  const { routerProps = { initialEntries: ['/'] }, ...mountOptions } = options

  const wrapped =(
    <ContextProvider>
      <CssBaseline />
      {component}
    </ContextProvider>
    )

  return mount(wrapped, mountOptions)
})

// Example use:
// cy.mount(<MyComponent />)