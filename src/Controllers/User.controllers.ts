import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { User } from '../Entities/User.entity';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
   
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOne({
      where:{
        email: email
      }
    });
  
    if (existingUser) {
      res.status(400).send({
        message: 'Email already taken'
      });
    } 
    else {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      const user = userRepository.create({
        name,
        email,
        password: hashPassword
      });
  
      await userRepository.save(user);
      if(user){
        res.status(201).json({
          id:user.id,
          email: user.email,
          token: generateToken(user.id, user.email)
        });
      }
      else {
        res.status(400);
        throw new Error("User not found");
      }
    }
  } catch (e:any) {
      return res.status(400).json({ status: 400, message: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: {
          email: email
      }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        id:user.id,
        email: user.email,
        token: generateToken(user.id, user.email)
      });
    }
    else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  } catch (e:any) {
      return res.status(400).json({ status: 400, message: e.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  };