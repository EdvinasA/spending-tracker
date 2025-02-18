import { sign, verify } from 'jsonwebtoken';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { UnauthorizedException } from './exception';

export let tokenData: { email: string } | null = null;

const JWT_SECRET_KEY = process.env.TOKEN_SECRET_KEY;

export const signToken = async (email: string): Promise<any> => {
    console.log(JWT_SECRET_KEY);
    return sign({ email: email }, JWT_SECRET_KEY, {
        expiresIn: 864000 // expires in 24 hours
    });
}

export const verifyToken = async (token?: string | null): Promise<boolean> => {
    try {
        console.log(JWT_SECRET_KEY);
        return await verify(token, JWT_SECRET_KEY);
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const encryptData = async (value: string): Promise<string> => {
    return hashSync(value, genSaltSync(10, 'b'));
}

export const compareEncryptedData = async (value: string, hashedValue: string): Promise<boolean> => {
    return compareSync(value, hashedValue);
}

export function Authorization() {
    return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const event = args[0];
            if (event.headers && event.headers.authorization) {
                const verifiedTokenData = await verifyToken(event.headers.authorization);

                if (verifiedTokenData === null) {
                    throw new UnauthorizedException('User is not authorizer!');
                }

                tokenData = verifiedTokenData as unknown as { email: string };
                return originalMethod.apply(this, args);
            }

            // If authorization fails, handle the error or return an unauthorized response
            throw new UnauthorizedException('Missing Authorization token!');
        };

        return descriptor;
    };
}
