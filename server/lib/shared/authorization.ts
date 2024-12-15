import { sign, verify } from 'jsonwebtoken';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';
import { UnauthorizedException } from './exception';

export let tokenData: { email: string } | null = null;

export const signToken = async (email: string): Promise<string> => {
    return sign({ email: email }, 'secret', {
        expiresIn: 86400 // expires in 24 hours
    });
}

export const verifyToken = async (token?: string | null) => {
    try {
        return await verify(token, 'secret');
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const encryptData = async (value: string) => {
    return hashSync(value, genSaltSync(10, 'b'));
}

export const compareEncryptedData = async (value: string, hashedValue: string) => {
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
