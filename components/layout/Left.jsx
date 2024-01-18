
import { useRouter } from "next/router"
import useCurrentUserStore from "@/libs/store/useCurrentUserStore"
import {FaHome} from 'react-icons/fa'
import{BiLogOut} from 'react-icons/bi';
import LeftBarItems from "../LeftBarItems"
import {BsBellFill} from 'react-icons/bs'
import {FaUser} from 'react-icons/fa';
import { BiLogIn } from "react-icons/bi";
import usegameStateStore from "@/libs/store/useGameStateStore";

export default function Left(){
    const currentUser = useCurrentUserStore((state)=>state.currentUser)
    const setCurrentUser = useCurrentUserStore((state)=>state.setCurrentUser)
    const setGameState = usegameStateStore((state)=>state.setGameState)
    const router = useRouter()
    const signOut = ()=>{
        localStorage.removeItem('token')
        setCurrentUser(null)
        setGameState(null)
        
        router.push('/')
    }
    return (
        <div className="mr-auto border-r border-gray-600 h-screen w-1/4 text-white">
            <div className="h-[5vh] text-3xl text-white flex items-center pl-4">ChessNet</div>
            <div className="flex gap-2 text-white items-center  font-bold hover:bg-opacity-10"> 
                <div className="w-full" onClick={()=>{router.push('/')}}>
                <LeftBarItems label='Home'><FaHome size={28}/></LeftBarItems>
                </div> 
            </div>

            <div className="flex gap-2 text-white items-center font-bold"> 
                <LeftBarItems label='Profile'><FaUser size={28}/></LeftBarItems>
            </div>

            <div className="flex gap-2 text-white items-center font-bold"> 
                <LeftBarItems label='Notifications'><BsBellFill size={28}/></LeftBarItems>
            </div>

            {currentUser && (<div className="flex gap-2 text-white items-center font-bold"> 
                <div onClick={signOut} className="w-full hover:bg-red-500">
                <LeftBarItems label='Logout'><BiLogOut size={28}/></LeftBarItems>
                </div>
            </div>)}

            {!currentUser && (<div className="flex gap-2 text-white items-center font-bold"> 
                <div onClick={()=>{router.push('/login')}} className="w-full hover:bg-purple-500">
                <LeftBarItems label='Login'><BiLogIn size={28}/></LeftBarItems>
                </div>
            </div>)}

        </div>
    )
}