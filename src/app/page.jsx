import { getServerSession } from "next-auth"; 
import Image from "next/image"; 
import { authOptions } from "./api/auth/[...nextauth]/route"; 
import { redirect } from "next/navigation";
import Logout from "../../components/Logoutbutton"
export default async function Home() { 
    const session = await getServerSession(authOptions); 
    if (!session) { 
        redirect('/auth/register/login'); 
    } 
    return ( 
        <>
        <h2>Home page logged in {session?.user?.email}</h2> 
      <Logout/>
        </>
    ); 
}
