import SideBar from "@/components/SideBar"


export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {

   
    return (
    <div className='flex h-screen pt-16'>
        <SideBar/>
        <div className='flex-1 p-4'>{children}</div>
     </div>
   
      
    )
  }