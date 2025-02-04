import { getOneByField, isValidString, TableName } from 'shared';
import { User } from 'user/model';


export class GetUserService {
    public getUser = async (email?: string): Promise<User> => {
        await isValidString(email, 'email');

        return await getOneByField<User>(TableName.USERS, 'email', email!);
    };

}