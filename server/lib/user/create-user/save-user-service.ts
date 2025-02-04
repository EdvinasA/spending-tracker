import { addItemToTable, BadRequestExceptionMessage, getOneByField, TableName, validateRequestObject } from "shared";
import { User, UserRegisterRequest, UserRegisterRequestSchema } from "user/model";
import { v4 as uuidv4 } from 'uuid';

export class SaveUserService {
    public save = async (request: UserRegisterRequest): Promise<void> => {
        await validateRequestObject(UserRegisterRequestSchema, request);

         const isUser = await this.checkIfUserExists(request);

         if (isUser) {
            throw new BadRequestExceptionMessage(`User already with email: ${request.email} exists`)
         }

        await addItemToTable<User>(TableName.USERS, {
            id: uuidv4(),
            email: request.email,
            createdAt: new Date().toISOString()
        });
    }

    private checkIfUserExists = async (request: UserRegisterRequest) => {
        try {
            await getOneByField<User>(TableName.USERS, 'email', request.email)
            return true;
        } catch {
            return false;
        }

    }
}