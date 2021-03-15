import jwt from 'jsonwebtoken';

const secretSignature = "VERY SECRET";
const tokenTime = "10d";

let generateToken = async (account) => {
        
    //try {
        return new Promise((resolve, reject) => {
            const accountData = {
                email: account.email
            }
            jwt.sign(
                accountData,
                secretSignature,
                {
                    algorithm: "HS256",
                    expiresIn: tokenTime,
                },
                (error, token) => {
                    if (error) return reject(error);
                    resolve(token);
                });
        });
    //} catch {
    //    res.status(409).json({ message: `An error occured: ${err.message}`});
    //}
    
}

let verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretSignature, (error, decoded) => {
            if (error) return reject(error);
            resolve(decoded);
        });
    });
}

export default {
    secretSignature: secretSignature,
    generateToken: generateToken,
    verifyToken: verifyToken,
};