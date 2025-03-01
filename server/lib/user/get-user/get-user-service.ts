import { getOneByField, TableName, TokenData, verifyToken } from 'shared';
import { User } from 'user/model';


export class GetUserService {
    public getUser = async (token: string): Promise<User> => {
        const userData = await verifyToken(token) as unknown as TokenData;

        return await getOneByField<User>(TableName.USERS, 'id', userData.id);
    };

}