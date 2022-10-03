
import AdminLayout from "@/components/layout/Layout"
import { GetStaticProps } from "next"
import Request from "@/utils/api/request"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import InfiniteScroll from "@/components/common/InfiniteScroll"
import { useState, useCallback, useContext, useEffect } from "react"
import { feedbacksReducer, StoreContext } from "@/reducers/store"
import { feedbackActions } from "@/reducers/feedbacks/reducer"
import { images } from "next.config"

const limit = 20
export const getStaticProps: GetStaticProps = async () => {

  const response = await Request({ path: `/feedback?limit=${limit}&page=${1}`, method: 'get', })

  let feedbacks;
  if (response.statusCode === 200) {
    feedbacks = response.docs
  } else {
    feedbacks = []
  }
  return ({
    props: {
      feedbacks,
      status: response.status || '',
      statusCode: response.statusCode || 0,
      message: response.message || ''
    }
  })
}

const FeedbacksPage = ({ feedbacks, }: {
  feedbacks: {
    email: string,
    message: string,
    name: string,
    _id: string,
  }[],
  statusCode: number, status: string, message: string,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldFetchWithPaginate, setShouldFetchWithPaginate] = useState(true)
  const { state: { feedbacks: { feedbacks: feedbacksInState }, }, combinedDispatch: { feedbackDispatch } } = useContext(StoreContext)

  const handlePaginationWithScroll = useCallback(async () => {

    const data = await feedbacksReducer.fetchFeedbacks([{ 'limit': `${limit}`, 'page': (currentPage + 1).toString() }])
    if (!data.error) {
      feedbackDispatch({ type: feedbackActions.updateFeedbacks, payload: [...data.docs,] })
      setCurrentPage(prev => prev + 1)
      if (data.total_count < limit) {
        setShouldFetchWithPaginate(false)
      }
    }
  }, [currentPage, feedbackDispatch])

  useEffect(() => {
    if (feedbacksInState.length < feedbacks.length) {
      feedbackDispatch({
        type: feedbackActions.updateFeedbacks, payload: feedbacks
      })
    }
  }, [feedbackDispatch, feedbacks, feedbacksInState.length])

  console.log(feedbacks, feedbacksInState)
  return (
    <AdminLayout title={"Feedbacks"} description={"Feedbacks"}>
      <Box>
        <Typography mx='auto' gutterBottom mt={4} sx={{ textDecoration: 'underline' }}
          textAlign='center' component='h1' variant='caption'>
          Feedbacks
        </Typography>
        <Box>
          <InfiniteScroll next={handlePaginationWithScroll} hasMore={shouldFetchWithPaginate} loader={undefined} dataLength={feedbacksInState.length}>
            <List sx={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', minHeight: '70vh'
            }}>
              {
                feedbacksInState.map(fb => {
                  return (
                    <ListItem key={fb._id} sx={{
                      width: '100%',
                      justifyContent: 'center'
                    }} >
                      <Card variant="outlined">
                        <CardContent>
                          <Typography color='secondary' gutterBottom>
                            {fb.email}
                          </Typography>
                          <Typography variant="body1" component="div" textTransform='capitalize' color="primary">
                            from: {fb.name}
                          </Typography>
                          <Typography variant="body2" color='primary.light' sx={{ wordBreak: 'break-all' }}>
                            message: {fb.message}
                            <br />
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button href={`mailto:${fb.email}?subject=Thank you for your feedback!`}
                            sx={{ fontSize: 20 }} size="small">Reply</Button>
                        </CardActions>
                      </Card>
                    </ListItem>
                  )
                })
              }
            </List>
          </InfiniteScroll>
        </Box>
      </Box>
    </AdminLayout>
  )
}

export default FeedbacksPage