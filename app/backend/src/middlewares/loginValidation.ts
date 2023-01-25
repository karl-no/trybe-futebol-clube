import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import HTTPCodes from '../utils/HTTPCodes';

const secret = process.env.JWT_SECRET;

const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTPCodes.badRequest).json({ message: 'All fields must be filled' });
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
    return res.status(HTTPCodes.authenticationError).json({ message: 'Token not found' });
  }
  try {
    const user = jwt.verify(token, secret as string);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(HTTPCodes.authenticationError)
      .json({ message: 'Token must be a valid token' });
    // return res.status(HTTPCodes.badRequest).json({ message: 'Expired or invalid token' });
  }
};

export { loginValidation, tokenValidation };
