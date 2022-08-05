// external imports
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

// internal imports
import User from '../models/person.model';
import config from '../config';
import BaseService from './base.service';

export default class UserService extends BaseService {

    constructor() {
        super(User);
    }

    signup = async (user: any) => {
        const hashedPassword = await this.getHashedPassword(user.password);
        const newUser: any = new User({
            ...user,
            password: hashedPassword,
        });
        await this.insertOne(newUser);
        return newUser;
    };
    
    login = async (email: string, password: string) => {
        const user = await this.getByEmail(email);
        
        if (user && user._id) {
            const isValidPassword = await this.getDoesPasswordMatch(password, user.password );    
            
            if (isValidPassword) {
                
                // prepare the user object to generate token
                const userObject = {
                  userid: user._id,
                  username: user.username,
                  email: user.email,
                  role: user.role || 'user',
                };
                
                // generate token
                const token = this.generateJwtToken(userObject);
    
                return { token, userObject };
            }
            else {
                throw createError(400, 'Login failed! Email & Password dont match.');
            }
        }
        else {
            throw createError(400, 'Login failed! Email & Password dont match.');
        }
    };
        
    getByEmail = async (email: string) => {
        const user = await User.findOne({ email: email });
        return user;
    };
        
    getHashedPassword = async (originalPassword: string): Promise<string> => {
        const salt = 10;
        const hashedPassword = await bcrypt.hash(originalPassword, salt);
        return hashedPassword;
    };
    
    getDoesPasswordMatch = async (passwordToCompare: string, passwordToCompareWith: string) => {
        const matched = await bcrypt.compare(passwordToCompare, passwordToCompareWith);
        return matched;
    };
    
    generateJwtToken = (userObject: any) => {
        const token = jwt.sign(userObject, config.jwt.secret, {
            expiresIn: config.jwt.expiry,
        });
        return token;
    };

}
