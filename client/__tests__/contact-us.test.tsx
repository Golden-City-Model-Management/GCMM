

import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactUs from '@/pages/contact-us'

describe('Contact us page is rendered with appropriate elemenst', () => {

  it('renders a main element', () => {
    render(<ContactUs />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('renders a heading', () => {
    render(<ContactUs />)
    expect(screen.getByRole('heading',
     {name: /about us/i})).toBeInTheDocument()
  })

  it('renders contact form and contact form is interactive and functional', async () => {
    render(<ContactUs />)

    const contactForm = screen.getByRole('form', {name: 'contact form'})
    const nameInput = screen.getByLabelText("name")
    const emailInput = screen.getByLabelText("email")
    const messageInput = screen.getByLabelText("message")
    const submitButton = screen.getByRole('button', {name: /submit/i})
    
    await userEvent.type(nameInput, 'John Doe')
    await userEvent.type(emailInput, 'johndoe@email.com')
    await userEvent.type(messageInput, 'Hello, I am John Doe') 
    
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(contactForm).toHaveFormValues({
      name: 'John Doe',
      email: 'johndoe@email.com',
      message: 'Hello, I am John Doe',
    })

    await userEvent.click(submitButton)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(contactForm).toHaveFormValues({
      name: '',
      email: '',
      message: '',
    })
  })
})