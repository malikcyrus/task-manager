import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

// Extending Request to include 'userId' property
interface AuthenticatedRequest extends Request {
  userId?: string;
}

// Set the authenticated user in the authenticated request
export const setUserMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  // extract token if found in headers
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    try {
      const decodedToken: any = jwt.verify(token, 'secretKey');
      const userId = decodedToken.userId;
      const user = await User.findById(userId);

      if (user) {
        req.userId = userId;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  next();
};

// Middleware to authenticate the user
export const authenticateUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
};
