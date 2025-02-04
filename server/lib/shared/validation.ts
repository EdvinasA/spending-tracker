import { ValidationError, ObjectSchema } from "joi";
import { BadRequestException, BadRequestExceptionMessage } from "./exception";

export const validateRequestObject = async (schema: ObjectSchema<any>, validationItem: any): Promise<void> => {
    try {
        await schema.validateAsync(validationItem);
    } catch (error: unknown) {
        throw new BadRequestException(error as ValidationError);
    }
}

export const isValidString = async (value: unknown, fieldName: string = 'Value'): Promise<void> => {
    if (typeof value !== 'string' || value.trim().length === 0) {
        throw new BadRequestExceptionMessage(`${fieldName} cannot be empty or undefined`);
    }
};
