



import { useState, useCallback } from 'react'
import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout' 
import Typography  from '@mui/material/Typography'
import { Prose } from '@/components/common/Typography'
import { WhiteBorderInput, TextareaAutoResizeWhiteBorder } from '@/components/common/Inputs'
import { WhiteButton } from '@/components/common/Buttons'
import Box from '@mui/material/Box'

const ContactUs: NextPageWithLayout = () => { 

  const [ feedback, setFeedback ] = useState({
    name: '', email: '', message: ''
  })

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }, [])

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if(feedback.name && feedback.email && feedback.message) {
      console.log(feedback)
    }
    setFeedback({
      name: '', email: '', message: ''
    })
  }, [feedback])

  return ( 
    <Box sx={{padding: '60px 0', maxWidth: {
      lg: '600px'
    } }}> 
     <Typography variant='caption' component='h1'>Contact Us</Typography> 
     <Prose 
      sxProp={{margin: '30px 0'}} 
      text={
      `Questions?  Compliants?  Feedback? 
      \n Don't hesitate to reach us.
      \n Our team will get back to you as soon as possible`}
     />
     <Box
     onSubmit={handleSubmit}
      component='form' sx={{
        maxWidth: '600px',
     }}>
     <Box sx={{
      display: 'flex', 
      alignItems: 'stretch',
      gap: '20px',
     }}>
      <Box sx={{
        flexBasis: '35%',
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: '20px',
      }}> 
        <WhiteBorderInput 
          name='name'
          type='text'
          placeholder='Enter your name'
          onChange={handleChange}
          value={feedback.name}
          sx={() => ({ width: '100%' })}
          required
         />
         <WhiteBorderInput 
          name='email'
          type='email'
          placeholder='Enter your email'
          onChange={handleChange}
          value={feedback.email}
          sx={() => ({ width: '100%' })}
          required
         />
      </Box>
      <Box  sx={{
        flexBasis: '60%',
        maxWidth: '60%',
      }}>
        <TextareaAutoResizeWhiteBorder 
          name='message'
          placeholder='Enter your message'
          onChange={handleChange}
          value={feedback.message}
          required
         />
      </Box>     
     </Box>
     <Box sx={{ margin: '20px 0'}}>
        <WhiteButton type='submit' variant='contained' sx={() => ({width: '100%'})} >
          submit
        </WhiteButton>
      </Box>
     </Box>
    </Box>
  )
}

const props = {
  title: 'Golden City Model Management | Contact Us',
  description: 'Contact Us. #20 Street Address, Town Address, City,  State, Nigeria  PO BOX 32342',
  favicon: '/vercel.svg',
  pad: true,
}

ContactUs.getLayout = getLayout(LayoutOne, props)

export default ContactUs