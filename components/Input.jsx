export default function Input({placeholder,onChange,value}){
    return(
        <input className="
                    mt-3
                    w-3/4
                    p-4
                    text-lg
                    bg-gray-900
                    border-2
                    border-neutral-800
                    rounded-md
                    online-none
                    text-white
                    focus:border-sky-500
                    focus:border-2
                    transition
                    disabled:bg-neutral-900
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    "
                    placeholder = {placeholder}
                    onChange={onChange}
                    value={value}

        />
    )
}