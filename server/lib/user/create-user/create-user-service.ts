import { addItemToTable, encryptData, TableName, validateRequestObject } from "shared";
import { User, UserRegisterRequest, UserRegisterRequestSchema } from "user/model";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserRepository } from "./create-user-repository";

export class SaveUserService {
    private createUserRepository = new CreateUserRepository();
    public save = async (request: UserRegisterRequest): Promise<void> => {
        await validateRequestObject(UserRegisterRequestSchema, request);

        await this.createUserRepository.getUserByEmail(request.email);

        await addItemToTable<User>(TableName.USERS, {
            id: uuidv4(),
            email: request.email,
            password: await encryptData(request.password),
            createdAt: new Date().toISOString()
        });
    }
}