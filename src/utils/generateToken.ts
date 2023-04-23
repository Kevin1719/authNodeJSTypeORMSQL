import jsonwebtoken, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const generateToken = (id:number, email:string) => {
    const tokenSecret: Secret = process.env.AUTH_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    return jsonwebtoken.sign({ id, email }, tokenSecret, {
        expiresIn: "30d",
    });
};