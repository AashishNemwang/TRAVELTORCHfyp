
const getLoggedInUser=async(req,res)=>{
    try{
        const user=req.user;
     return res.json({user:user});
    }
    catch(error){
        console.log(error);
    }
}
module.exports= getLoggedInUser