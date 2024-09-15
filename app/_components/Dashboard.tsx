
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

interface DashboardProsps {  
    users: User[],
    nameUserSession: string;     
}

const Dashboard = ({users, nameUserSession}: DashboardProsps) => {
    const route = useRouter();

    const logoutButton = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("name");
        route.push("/login");        
    }
    
   return (
    
    <div className="bg-gray-100">  

        <div className="header bg-white h-16 px-10 py-8 border-b-2 border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400">
                 <span className="tracking-wide text-md flex-col flex">
                    <span className="text-base">Welcome back, {nameUserSession}</span>
                    <button onClick={logoutButton}>Logout</button>
                </span>
              </div>
        </div>
        <div className="header my-3 px-10 flex items-center justify-between">------           
        </div>
        <div className="flex">
           
            <div className="w-full m-1 bg-white shadow-lg text-lg rounded-sm border border-gray-200">
                <div className="overflow-x-auto rounded-lg p-3">
                    <table className="table-auto w-full">
                        <thead className="text-sm font-semibold uppercase text-gray-800 bg-gray-50 mx-auto">
                            <tr>
                                <th></th>
                                <th><svg xmlns="http://www.w3.org/2000/svg" className="fill-current w-5 h-5 mx-auto"><path d="M6 22h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2zm7-18 5 5h-5V4zm-4.5 7a1.5 1.5 0 1 1-.001 3.001A1.5 1.5 0 0 1 8.5 11zm.5 5 1.597 1.363L13 13l4 6H7l2-3z"></path></svg></th>
                                <th className="p-2">
                                    <div className="font-semibold">Name</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-left">Email</div>
                                </th>
                                <th className="p-2">
                                    <div className="font-semibold text-center">Action</div>
                                </th>
                            </tr>
                            {Array.isArray(users) ? (
          users.map((user: User) =>(
            <tr key={user.id}>
            <td>1</td>
            <td>
                <img 
                src="https://images.pexels.com/photos/25652584/pexels-photo-25652584/free-photo-of-elegant-man-wearing-navy-suit.jpeg?auto=compress&cs=tinysrgb&w=400" 
                className="h-8 w-8 mx-auto" /></td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td className="p-2">
                <div className="flex justify-center">
                <a href="#" className="rounded-md hover:bg-green-100 text-green-600 p-2 flex justify-between items-center">
                    <span>
                    </span> EDIT
                </a>
                <button className="rounded-md hover:bg-red-100 text-red-600 p-2 flex justify-between items-center">
                    <span></span> DELETE
                </button>
                </div>
            </td>
        </tr>

          ) )): (
            <p>No users found</p>
                 )}
                   </thead>
                    </table>
                </div>
            </div>
            
        </div>
        
    </div>

    
  )
}

export default Dashboard