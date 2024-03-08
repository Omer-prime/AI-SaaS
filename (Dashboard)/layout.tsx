import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApilimitCount } from "@/lib/api-limit";

const Dashboardlayout = async ({children}:{children: React.ReactNode})=>{

    const apiLimitCount = await getApilimitCount();
return(
     <div className="h-full relative">
        <div className="hidden h-full md:flex md:flex-col md:fixed md:inset-y-0  bg-gray-900 md:w-72">
         
        <Sidebar  apiLimitCount={apiLimitCount} />
                
                </div>
                    <main className="md:pl-72 pb-10">
                        <Navbar/>
                        {children}
                    </main>

     </div>
)

}
export default Dashboardlayout;