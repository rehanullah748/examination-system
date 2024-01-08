
import { check_auth } from "../actions"
import Nav from "@/components/Nav"
import SideBar from "@/components/SideBar"



export default async function RootLayout({ children }) {
  const auth = await check_auth()
 
  return (
    <div className="bg-gray-50 dark:bg-slate-900">

  
<Nav auth={auth}/>
 <SideBar/>
 
  <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
   
   <div>{children}</div>
   
  </div>
 
</div> 
  )
}


