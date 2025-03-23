import { verifyToken } from 'shared';
import { AuthorizerRepository } from './authorizer-repository';

export class AuthorizerService {
    private repository: AuthorizerRepository;

    constructor() {
        this.repository = new AuthorizerRepository();
    }

    public validateToken = async (token: string): Promise<boolean> => {
        const decoded = await verifyToken(token) as unknown as { email: string };
        const user = await this.repository.getUserByEmail(decoded.email);
        return user ? true : false;
    };
}