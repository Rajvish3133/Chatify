import jwt from "jsonwebtoken"

const isAuthenticated = async(req, res, next)=>{
    try {
        
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"User not authenticated."})
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    //    console.log(decode);
    
    //    decode = {
    //    userId: "65a1f9c8e9c8c2f1b7c12345",
    //    iat: 1700000000,
    //    exp: 1700086400
    //    }
        
        if(!decode){
            return res.status(401).json({message: "Invalid Token"});
        }

        // req.id = decode.userId        stores the authenticated user’s ID from the JWT into the request object so that 
        // protected routes can identify the currently logged-in user.
        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
        
    }
}

export default isAuthenticated;