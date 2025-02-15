import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import { useRouter } from "next/router";
import User from '../../libs/userSchema';
const UserView = () =>{
    const router = useRouter();
    const {userId} = router.query;

    // if(isLoading || !fetchedUser){
    //     return(
    //         <div className="
    //         flex
    //         justify-center
    //         items-center
    //         h-full
    //         ">
    //         <ClipLoader color="lightblue" size = {80}/> 
    //         </div>
    //     )
    // }
    return (
        <>
        {/* <Header showBackArrow label={fetchedUser?.name}/> */}
        <UserHero userId = {userId}/>
        <UserBio userId = {userId}/>
        <div className="text-white">Profile</div>
        </>
    );
}

export default UserView