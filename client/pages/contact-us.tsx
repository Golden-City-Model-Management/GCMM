



import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import { Prose } from '@/components/common/Typography'
import Typography  from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { WhiteBorderInput } from '@/components/common/Inputs'
import { useState, useCallback } from 'react'

const ContactUs: NextPageWithLayout = () => { 

  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
  })
  const handleChange: React.ChangeEventHandler<HTMLInputElement> =
   useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(prev => 
      ({...prev, [event.target.name]: event.target.value }))
  }, [])

  const handleSubmit: React.ChangeEventHandler<HTMLFormElement> =
   useCallback((event) => {
    event.preventDefault()
    const values = Object.values(feedback)
    console.log(values)
    if (values.some(v => v.length === 0)) {
      return alert('all vields are required')
    }
    alert('Thank you for your feedback!')
    console.log(feedback)
  }, [feedback])

  return ( 
    <Box sx={{padding: '60px 0', maxWidth: '600px'}}> 
      <Box>
        <Typography variant='caption' component='h1'>Contact Us</Typography>

        <Prose sxProp={{margin: '30px 0'}} text={`Questions?  Compliants?  Feedback? \n Don't hesitate to reach us.\n Our team will get back to you as soon as possible`} />
      </Box>
      <Box
        component='form'
        onSubmit={handleSubmit}>
        <Grid
          container spacing={2}  mt={5}
          sx={(theme) => ({
          border: `2px solid ${theme.palette.text}`,
          alignItems: 'stretch'})}>
            <Grid item sm={6} xs={12} 
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
              gap={3}
            >
              <WhiteBorderInput 
              placeholder='name' 
              name='name' 
              value={feedback.name} 
              onChange={handleChange}
              type='text'
              autoFocus={true}
              />
              <WhiteBorderInput
              placeholder='email' 
              name='email' 
              value={feedback.email}
              onChange={handleChange}
              type='text'
              />
            </Grid>

            <Grid item sm={6} xs={12}>
              <WhiteBorderInput
              placeholder='Leave your message'
              name='message'
              value={feedback.message}
              onChange={handleChange}
              sx={() => ({ height: '100%', width: '100%',})}
              components={{Input: 'textarea'}}
              />
            </Grid>

            <Grid item sm={12} xs={12}>
              <WhiteBorderInput 
                name='email' 
                value='submit ' 
                onChange={() => ({})}
                type='submit'
                sx={(theme) => ({
                  width: '100%', 
                  background: theme.palette.text.primary, 
                  color: theme.palette.primary.main,
                  fontSize: '1.5rem',
                  padding: '4px 8px',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  }
                })}
                />
            </Grid>
        </Grid>
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