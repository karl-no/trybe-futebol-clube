import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  next();
};

const tokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization: token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const user = jwt.verify(token, secret as string);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Expired or invalid token' });
  }
};

export { loginValidation, tokenValidation };
