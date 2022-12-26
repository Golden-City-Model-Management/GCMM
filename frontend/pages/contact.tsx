



import { useState, useCallback } from 'react'
import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { TopCenteredSnackbar } from '@/components/common/snackbars'
import { SuccessAlert, ErrorAlert } from '@/components/common/alert'
import { Prose } from '@/components/common/Typography'
import { WhiteBorderInput, TextareaAutoResizeWhiteBorder } from '@/components/common/Inputs'
import { StyledBorderBtn } from '@/components/common/Buttons'
import Loader from '@/components/common/loader'
import Box from '@mui/material/Box'
import Request from '@/utils/client/request'

const ContactUs: NextPageWithLayout = () => {

  const [feedback, setFeedback] = useState({
    name: '', email: '', message: ''
  })

  const [loading, setLoading] = useState(false)

  const [submitSuccessfull, setSubmitSuccessfull] = useState({
    success: false, message: '', open: false
  })

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }, [])

  const resetSubmituccessful = useCallback(() => {
    setSubmitSuccessfull({
      success: false, message: '', open: false
    })
  }, [])

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (feedback.message.trim().length < 10) return setSubmitSuccessfull({
      success: false, message: 'Message must be at least 10 characters long', open: true
    })
    if (feedback.message.trim().length > 500) return setSubmitSuccessfull({
      success: false, message: `Message too long!`, open: true
    })
    setLoading(true)
    const response = await Request({
      method: 'POST',
      path: '/feedback',
      data: feedback,
      returnErr: true
    })
    const { message } = await response
    if (response.statusCode === 201) {
      setSubmitSuccessfull({
        success: true, message, open: true,
      })
      setFeedback({
        name: '', email: '', message: ''
      })
    } else {
      setSubmitSuccessfull({
        success: false, message, open: true,
      })
    }
    setLoading(false)
  }, [feedback])

  const AlertChildren = () =>
  (<Box component='div'>
    {submitSuccessfull.message}
    <IconButton sx={{ justifyContent: 'flex-end' }} data-testid='close-contact-form-success' onClick={resetSubmituccessful} color="inherit" size="small">
      <CloseIcon />
    </IconButton>
  </Box>)

  return (
    <Box sx={{
      padding: '60px 0', maxWidth: {
        lg: '600px'
      }
    }}>
      <TopCenteredSnackbar
        open={submitSuccessfull.open}
        autoHideDuration={600000}
        onClose={resetSubmituccessful}>
        {
          submitSuccessfull.success ?
            <SuccessAlert><AlertChildren /></SuccessAlert> :
            <ErrorAlert><AlertChildren /></ErrorAlert>
        }
      </TopCenteredSnackbar>
      <Loader open={loading} />
      <Typography variant='caption' component='h1'>Contact Us</Typography>
      <Prose
        sxProp={{ margin: '20px 0 35px' }}
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
          display: {
            md: 'flex',
          },
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
              inputProps={{ maxLength: 30, minLength: 3 }}
              required
            />
            <WhiteBorderInput
              name='email'
              type='email'
              placeholder='Enter your email'
              onChange={handleChange}
              value={feedback.email}
              sx={() => ({ width: '100%' })}
              inputProps={{ maxLength: 30, minLength: 3 }}
              required
            />
          </Box>
          <Box flexBasis='60%' marginTop={{ xs: '20px', md: '0' }}
            maxWidth={{ md: '60%' }} display='flex'
            flexDirection='column' alignItems='stretch'>
            <TextareaAutoResizeWhiteBorder
              name='message'
              placeholder={`Enter your message \nMinimum of 10 characters \nMaximum of 500 characters`}
              onChange={handleChange}
              value={feedback.message}
              required
            />
          </Box>
        </Box>
        <Box sx={{ margin: '20px 0' }}>
          <StyledBorderBtn type='submit' variant='contained' sx={() => ({ width: '100%' })} >
            submit
          </StyledBorderBtn>
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
  canonical: `${process.env.BASE_URL}/contact`
}

ContactUs.getLayout = getLayout(LayoutOne, props)

export default ContactUs