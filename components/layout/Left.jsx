
import Button from "../Button"
import { useRouter } from "next/router"
import useCurrentUserStore from "@/libs/useCurrentUserStore"

export default function Left(){
    const setCurrentUser = useCurrentUserStore((state)=>state.setCurrentUser)
    // const currentUser = useCurrentUserStore((state)=>state.currentUser)
    const router = useRouter()
    const signOut = ()=>{
        localStorage.removeItem('token')
        setCurrentUser(null)
        router.push('/login')
    }
    return (
        <div className="mr-auto border-r border-gray-600 h-screen w-48 text-white">
            <div className="p-2">
                <Button label={'Create game'} visible={true}></Button>
            </div>
            <div className="p-2">
                <Button label={'Sign Out'} visible={true} onClick={signOut}></Button>
            </div>
        </div>
    )
}