import { getUserValidationSchema } from '../model';
import { BadRequestExceptionMessage, getByField } from 'shared';

export const getUser = async (email: string): Promise<any> => {

    const { error } = getUserValidationSchema.validate({ email });
    if (error) {
        throw new BadRequestExceptionMessage(`Invalid email: ` + error.message);
    }

    const result = await getByField('Users', 'email', email);

    if (!result || !result.Items || result.Items.length === 0) {
        throw new BadRequestExceptionMessage(`User with email ${email} not found`);
    }

    return result.Items[0];
};
