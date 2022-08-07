


import { NextPageWithLayout } from '@/types/pages'
import LayoutOne from '@/components/layout/LayoutOne'
import getLayout from '@/utils/pages/getLayout'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { WithNextLink } from '@/components/common/Links'
import { StyledBorderBtn } from '@/components/common/Buttons'
import { Prose } from '@/components/common/Typography'
import { paragraphs } from '@/constants/about-us'


const AboutUs: NextPageWithLayout = () => {

  return (
    <Box sx={{padding: '60px 0'}}>
      <Typography variant='caption' component='h1' >About Us</Typography>
      {paragraphs.map(text => (
          <Prose text={text} key={text} sxProp={{margin: '30px 0'}}/>
        ))
      }
      <WithNextLink href='/careers' passHref>
        <StyledBorderBtn>join our team</StyledBorderBtn>
      </WithNextLink>
    </Box>
  )
}


const props = {
  title: 'Golden City Model Management | About Us',
  description: 'Golden City Model Management. Finding and refining talent. African Premium Agency located in Lagos, Nigeria',
  favicon: '/vercel.svg',
  pad: true,
}

AboutUs.getLayout = getLayout(LayoutOne, props)

export default AboutUs 