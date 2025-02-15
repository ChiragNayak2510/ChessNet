import User from '../../../libs/userSchema';

export default async function handler(req,res){
    if(req.method !== 'GET'){
        return res.status(405).end();
    }
    try{
        const {userId} = req.query;
        console.log(userId)
        const user = await User.findOne(
            {_id : userId}
        )
    return res.status(200).json(user);
}catch(error){
    console.log(error)
    return res.status(400).end()
}
}