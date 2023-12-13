import Left from "./layout/Left"
import Right from "./layout/Right"

const Layout = ({children})=>{
    return(
        <div className="flex">
            <Left/>
        <div className = "w-full p-6 h-screen relative" >
            {children}
        </div>
            <Right/>
        </div>
        
    )
}

export default Layout;