import { compareEncryptedData, signToken, UnauthorizedException, validateRequestObject } from 'shared';
import { LoginRequest, LoginRequestRequestSchema } from 'user/model';
import { LoginRepository } from './login-repository';


export class LoginService {
    private loginRepository = new LoginRepository();

    public getSignedToken = async (request: LoginRequest): Promise<string> => {
        await validateRequestObject(LoginRequestRequestSchema, request);

        const user = await this.loginRepository.getUserByEmail(request.email);

        const isCorrectPassword: boolean = await compareEncryptedData(request.password, user.password);

        if (!isCorrectPassword) {
            throw new UnauthorizedException("Invalid password provided");
        }

        return await signToken(user.id, user.email);
    };

}