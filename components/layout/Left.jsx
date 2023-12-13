
import Button from "../Button"
import { useRouter } from "next/router"
export default function Left(){
    const router = useRouter()
    const signOut = ()=>{
        localStorage.removeItem('token')
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