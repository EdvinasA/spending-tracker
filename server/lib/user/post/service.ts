import {postItem} from "../../shared/database";

export const saveUser = async (email?: string): Promise<void> => {
if (!email) {
    throw new Error('Email is required');
}
// User Object
const user = {
    email: email,
    createdAt: new Date().toISOString()
};

await postItem('Users', user);
return;
};