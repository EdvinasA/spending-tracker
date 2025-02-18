import { compareEncryptedData, getOneByField, signToken, TableName, UnauthorizedException, validateRequestObject } from 'shared';
import { LoginRequest, LoginRequestRequestSchema, User } from 'user/model';


export class LoginService {
    public getSignedToken = async (request: LoginRequest): Promise<string> => {
        await validateRequestObject(LoginRequestRequestSchema, request);
        console.log("asd");

        const user = await getOneByField<User>(TableName.USERS, 'email', request.email);

        console.log(user);

        const isCorrectPassword: boolean = await compareEncryptedData(request.password, user.password);

        console.log(isCorrectPassword);

        if (!isCorrectPassword) {
            throw new UnauthorizedException("Invalid password provided");
        }

        return await signToken(request.email);
    };

}