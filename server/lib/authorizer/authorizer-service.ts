import { getOneByField, TableName, verifyToken } from 'shared';
import { User } from 'user/model';


export class AuthorizerService {
    public validateToken = async (token: string): Promise<boolean> => {
        const decoded = await verifyToken(token) as unknown as { email: string };

        const user = await getOneByField<User>(TableName.USERS, 'email', decoded.email);

        return user ? true : false;
    };

}