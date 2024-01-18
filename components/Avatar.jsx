
import useUserIdStore from '@/libs/store/useUserIdStore';
import { useRouter } from 'next/router';

export default function Avatar({userId,hasBorder,isLarge}){
    const router = useRouter()
    const onClick = (event)=>{
        // event.stopPropagation();
        // const url = `users/${userId}`;
        // router.push(url)
    }

    return(
        <div className={`
        ${hasBorder ? 'border-4 border-black':''}
        ${isLarge ? 'h-32':'h-12'}
        ${isLarge ? 'w-32' : 'w-12'}
        rounded-full
        hover : opacity-90
        transition
        cursor-pointer
        relative
        `}
        >
        <img
            style={{
                objectFit: 'cover',
                borderRadius: '50%', // Use 50% for a circular shape (assuming it's a square image)
                width: '100%',      // Adjust width as needed
                height: 'auto',     // Maintain aspect ratio
                cursor: 'pointer',  // Add any additional styles you need
            }}
            alt="Avatar"
            onClick={onClick}
            src="/placeholder.png"
        />
        </div>
    )}