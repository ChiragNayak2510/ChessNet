import Left from "./layout/Left"
import Right from "./layout/Right"
import Header from "./layout/Header"

const Layout = ({children})=>{
    return(
        <div className="flex">
            <Left/>
        <div className = "w-full h-screen" >
            <Header showBackArrow={true}/>
            {children}
        </div>
            <Right/>
        </div>
        
    )
}

export default Layout;