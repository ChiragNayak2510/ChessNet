import auth from "@/libs/auth"
export default async function handler(req,res){
    if(req.method!=='POST'){
        return res.status(405).end()
    }
    try{
        const currentUser = await auth(req);
        res.status(200).json(currentUser)   
    }
    catch(error){
        console.log(error)
        res.status(405).end()
    }
}