

import { NextPage } from "next"
import { useEffect } from "react"

const AdminHomePage: NextPage = (props) => {
 const fetcher = async () => {
    await fetch("http://localhost:9876/api/v1/users/login")
   }

  return ( 
    <div className="test" onClick={() => fetcher()}>  
      Log me in!!!!
    </div>
  )
} 


export default AdminHomePage 