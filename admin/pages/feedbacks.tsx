
import AdminLayout from "@/components/layout/Layout"
import { GetStaticProps } from "next"
import Request from "@/utils/api/request"

export const getStaticProps: GetStaticProps = async () => {

  return ({
    props: {

    }
  })
}


const FeedbacksPage = () => {

  return (
    <AdminLayout title={"Feedbacks"} description={"Feedbacks"}>
     Hello world
    </AdminLayout>
  )
}

export default FeedbacksPage