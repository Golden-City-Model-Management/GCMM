import Box from '@mui/material/Box';
import ChevronRightOutlined from '@mui/icons-material/ChevronRightOutlined';
import ChevronLeftOutlined from '@mui/icons-material/ChevronLeftOutlined';
import ReactMuiCarousel from 'react-material-ui-carousel'

export default function Carousel({ carouselItems, }: {
  carouselItems: any[]
}) {
  return (
    <Box overflow='hidden' position='absolute' height='100%' width='100%' >
      <ReactMuiCarousel animation='slide' autoPlay={false} navButtonsAlwaysVisible
      sx={{height: '100%', overflow: 'hidden'}}
         NextIcon={<ChevronRightOutlined color='secondary'/>}
         PrevIcon={<ChevronLeftOutlined  color='secondary'/>}>
            {carouselItems.map( (item, i) => <Box key={i}>{item}</Box> )}
        </ReactMuiCarousel>
    </Box>
  );
}