import { compareEncryptedData, getOneByField, signToken, TableName, UnauthorizedException, validateRequestObject } from 'shared';
import { LoginRequest, LoginRequestRequestSchema, User } from 'user/model';


export class AuthorizerService {
    public getSignedToken = async (request: LoginRequest): Promise<string> => {
        await validateRequestObject(LoginRequestRequestSchema, request);

        const user = await getOneByField<User>(TableName.USERS, 'email', request.email);

        const isCorrectPassword: boolean = await compareEncryptedData(request.password, user.password);

        if (!isCorrectPassword) {
            throw new UnauthorizedException("Invalid password provided");
        }

        return await signToken(request.email);
    };

}