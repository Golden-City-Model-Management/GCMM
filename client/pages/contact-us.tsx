



import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import { Prose } from '@/components/common/Typography'
import Typography  from '@mui/material/Typography'
import Box from '@mui/material/Box'

const ContactUs: NextPageWithLayout = () => { 

  return ( 
    <Box sx={{padding: '60px 0'}}> 
     <Typography variant='caption' component='h1'>Contact Us</Typography> 
     <Prose sxProp={{margin: '30px 0'}} text={`Questions?  Compliants?  Feedback? \n Don't hesitate to reach us.\n Our team will get back to you as soon as possible`} />
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