import HeaderDashboard from "@/components/HeaderDashboard"
import SideBar from "@/components/SideBar"


export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

   
    return (
    <div className='flex flex-col h-screen '>
        <HeaderDashboard/>
        <div className='flex flex-1  h-full'>
          <SideBar/>
          <div className="w-full h-full overflow-y-auto p-4">
            {children}
          </div>
        </div> 
     </div>
   
      
    )
  }