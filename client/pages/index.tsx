import type { NextPage } from 'next'
import Typography from '@mui/material/Typography'
import Header from '@/components/header/Header'
 
const Home: NextPage = () => {
  
  return (
    <div>
      <Header showMenuBtnAlways={false} />
      <Typography variant='caption' >Hello Next.js</Typography>
      Hello world 
    </div>
  ) 
} 

export default Home
 