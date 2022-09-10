import Image from 'next/image'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Model } from '@/types/models'
import { nonDisplayedFields } from '@/components/models/ModelForm'

const StatsKeyValPair = ({ title, value }: { title: string, value?: string | number }) => {
  return (
    <Typography textTransform='capitalize'>
      <Typography fontWeight='bold' component='b'>{title}</Typography>:&nbsp;
      <Typography component='span'>{value}</Typography>
    </Typography>
  )
}


const ModelData = ({model}:{model: Model}) => { 
  
  const modelStatistics = Object.keys(model).filter(key => !nonDisplayedFields.includes(key))
  return (
    <>
      <Box position="relative" mx='auto' minHeight='50%' width='100%' borderRadius={'100%'} overflow='hidden' >
        <Image src={`${model.cover_image}`} alt={model.name} 
        objectFit='contain' 
        objectPosition='center' layout='fill' />
      </Box>
      <Box 
      my={2} mx='auto' width='80%' 
      display='flex'rowGap={1} columnGap={3} 
      flexWrap='wrap' alignItems='center' justifyContent='center'>
        {modelStatistics.map(stat => (<StatsKeyValPair key={stat} title={stat} value={model[stat as keyof Model] + 'cm'} />))}
      </Box>
    </>
  )
}

export default ModelData