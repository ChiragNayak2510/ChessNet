
const LeftBarItems = ({label,children})=>{

    return <>
        <div onClick= {()=>{}} className="flex w-full flex-row items-center">
            <div className="relative rounded-full h-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer lg:hidden">
            <div className="text-white">{children}</div>
            </div>
            <div className="relative hidden flex-grow lg:flex items-center gap-4 p-4 rounded-lg hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer">
                <div className="text-white">{children}</div>
                <p className="md-block text-white text-xl">
                    {label}
                </p>
            </div>
        </div>
    </>
}

export default LeftBarItems;