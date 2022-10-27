import { NextPageWithLayout } from "@/types/pages";
import getLayout from "@/utils/pages/getLayout";
import LayoutWithMenuBtnAlways from "@/components/layout/LayoutTwo";
import { GetStaticPaths, GetStaticProps } from "next";
import Request from "@/utils/client/request";
import { parseParam } from "@/utils/pages/params";
import { useMemo } from "react";
import GalleryImage from "@/components/gallery/GalleryImage";
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Typography } from "@mui/material";
import ErrorDisplay from "@/components/common/ErrorDisplay";

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const response = await Request({ path: '/models?fields=slug', method: 'get', })
  const paths = await response.docs.map((el: {
    slug: string, age: number, id: string
  }) => ({ params: { slug: el.slug.toString() } }))
  return {
    paths,
    fallback: true
  }
}
export const getStaticProps: GetStaticProps = async (ctx) => {

  const modelSlug = parseParam(ctx.params?.slug)
  const response = await Request({path: `/models?slug=${modelSlug}&fields=polaroids,extra_polaroids,name,`, method: 'get'})
  return {
    props: {
      model: response.docs[0] || null 
    }
  }
}

const Polaroids: NextPageWithLayout =  ({ model }: {
  [x: string]: any,
}) => {

  const polaroids = useMemo(() => {
    const polaroids = model && model.polaroids ? Object.keys(model.polaroids).map(el => {
      return model.polaroids[el]
    }) : []
    if( model && model.extra_polaroids && model.extra_polaroids.length > 0) {
      model.extra_polaroids.forEach((el: any) => {
        polaroids.push(...(Object.keys(el).map(key => el[key])))
      })
    }
    return polaroids.filter(el => typeof el !== 'string')
  }, [model])


  if(!model) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='65vh'>
        <ErrorDisplay msg='An Error Occured!'> </ErrorDisplay>
      </Box>
    )
  }

  return(
  <Box>
    <Typography variant='caption' component='h1' my={4} textTransform='capitalize' textAlign='center'>
      {model.name}&rsquo;s Polaroids
    </Typography>
    <Grid container component='ul' justifyContent='center' alignItems='center' gap={3} >
      {polaroids.map(el => ( 
        <GalleryImage key={el._id} item={el} component='li'/>
      ))}
    </Grid>
  </Box>
  )
}

const layoutProps = {
  title: 'Polaroids | GCMM',
  description: 'Polaroids | GCMM'
}
Polaroids.getLayout = getLayout(LayoutWithMenuBtnAlways, layoutProps)
export default Polaroids