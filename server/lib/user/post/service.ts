import { postItem } from "shared";
import { v4 as uuidv4 } from 'uuid';

export const saveUser = async (email?: string): Promise<void> => {
    if (!email) {
        throw new Error('Email is required');
    }
    
    const user = {
        id: uuidv4(),
        email: email,
        createdAt: new Date().toISOString()
    };

    await postItem('Users', user);
};