import jwt from "jsonwebtoken";

/**
 *@param {Object} payload - any data you want to send
 * @param {String} expiresIn - Token expiry time (default: '1h')
 * @returns {String} JWT Token
 */


 const generateToken = (payload) =>{
    return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'7d'})
 }

 export default generateToken