import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    ScanCommandInput,
    ScanCommand,
    PutCommandInput,
    PutCommand,
    DeleteCommand,
    DeleteCommandInput,
    PutCommandOutput,
    QueryCommand
} from '@aws-sdk/lib-dynamodb';
import { BadRequestExceptionMessage } from './exception';

export const dynamoDbClient = new DynamoDBClient({
    region: process.env.REGION || "us-west-2",
    endpoint: process.env.ENVIRONMENT === "dev" ? undefined : "http://localhost:8000",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID_VALUE || "fakeMyKeyId",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_VALUE || "fakeSecretKey"
    }
});

export const executeQuery = async <T>(
    input: QueryCommand
): Promise<T[]> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);
    try {
        const response = await dynamoDBDocumentClient.send(input);

        if (response.Items && response.Items.length > 0) {
            return response.Items as T[];
        }

        return [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const executeScan = async <T>(
    input: ScanCommand
): Promise<T[]> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);
    try {
        const response = await dynamoDBDocumentClient.send(input);

        if (response.Items && response.Items.length > 0) {
            return response.Items as T[];
        }

        return [];
    } catch (err) {
        console.error(err);
        throw err;
    }
};

export const getOneByField = async <T>(tableName: string, fieldName: string, fieldValue: string): Promise<T> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: ScanCommandInput = {
        TableName: tableName,
        FilterExpression: `${fieldName} = :field`,
        ExpressionAttributeValues: { ':field': fieldValue }
    };

    try {
        const response = await dynamoDBDocumentClient.send(new ScanCommand(input));

        if (!response.Items || response.Items.length === 0) {
            throw new BadRequestExceptionMessage(
                `No record found in ${tableName} where ${fieldName} = ${fieldValue}`
            );
        }

        return response.Items[0] as T;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export const getByField = async <T>(tableName: string, fieldName: string, fieldValue: string): Promise<T[]> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: ScanCommandInput = {
        TableName: tableName,
        FilterExpression: `${fieldName} = :field`,
        ExpressionAttributeValues: { ':field': fieldValue },
    };

    try {
        const response = await dynamoDBDocumentClient.send(new ScanCommand(input));
        return (response.Items || []) as T[];
    } catch (err) {
        console.error(err);
        return [];
    }
}


export const addItemToTable = async <T extends Record<string, any>>(
    tableName: string,
    itemToPost: T
): Promise<PutCommandOutput> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: PutCommandInput = {
        TableName: tableName,
        Item: itemToPost
    };

    try {
        return await dynamoDBDocumentClient.send(new PutCommand(input));
    } catch (err) {
        console.error(err);
        return Promise.reject(err);
    }
};

export const deleteItem = async (tableName: string, itemId: string, sortKey: string): Promise<void> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: DeleteCommandInput = {
        Key: {
            id: itemId,
            email: sortKey
        },
        TableName: tableName,
    };

    try {
        await dynamoDBDocumentClient.send(new DeleteCommand(input));
    } catch (err) {
        console.error(err);
        return Promise.reject(null);
    }
}