export default function Button({label,visible,onClick}){
    return( 
        visible && 
        (<button onClick={onClick} className="mt-4 flex h-12 w-full bg-purple-500 rounded-full justify-center items-center hover:bg-purple-400">
        {label}
    </button>)
    )
}
