import {BadRequestException, postItem} from "shared";
import {userValidationSchema} from "../model";

export const saveUser = async (email?: string): Promise<void> => {


    const { error } = await userValidationSchema.validateAsync({ email });
    if (error) {
        throw new BadRequestException(error)
    }
// User Object
const user = {
    email: email,
    createdAt: new Date().toISOString()
};

await postItem('Users', user);
return;
};