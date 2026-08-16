import { UserButton } from "@clerk/react"
import { Home, Settings } from "lucide-react"

const AdminDashboard = () => {

    const pages = [
        {
            title: "Home",
            icon: Home,
            url:'/'
        },
        {
            title:"Setting",
            icon:Settings,
            url:'/settings'
        },
        {
           title:"" 
        }
    ]


    return (
        <div className="w-full h-screen bg-white">

        </div>
    )
}

export default AdminDashboard   