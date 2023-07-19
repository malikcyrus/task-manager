import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => { 
    const { name, email, password} = req.body;

    try { 
        // Check if user exists
        const exisitingUser = await User.findOne({email});
        if (exisitingUser) { 
            return res.status(400).json({error: 'User already exists!' });
        }

        // Hashing the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // New user 
        const newUser: IUser = new User( { name, email, password: hashedPassword});

        // Adding new user to list 
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully'});
    } catch (error) { 
        console.error('Error registerring user:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

// User login 
router.post('/login', async (req: Request, res: Response) => { 
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT 
        const token = jwt.sign({ userId: user.id }, 'secretKey', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).json({error: ' Internal server error'});
    }
});

export default router; 