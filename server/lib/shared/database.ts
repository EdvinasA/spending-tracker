import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    GetCommand,
    GetCommandInput,
    GetCommandOutput,
    ScanCommandInput,
    ScanCommand,
    ScanCommandOutput,
    PutCommandInput,
    PutCommand,
    DeleteCommand,
    DeleteCommandInput,
    PutCommandOutput,
} from '@aws-sdk/lib-dynamodb';

const dynamoDbClient = process.env.ENDPOINT !== '' ? new DynamoDBClient({ region: process.env.REGION, endpoint: process.env.ENDPOINT })
    : new DynamoDBClient({ region: process.env.REGION });

export const getByEmail = async <T>(tableName: string, email: string): Promise<T | undefined> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: GetCommandInput = {
        TableName: tableName,
        Key: { email: email }
    };

    try {
        const getCommandOutput = (await dynamoDBDocumentClient.send(
            new GetCommand(input)
        )) as Omit<GetCommandOutput, 'Item'> & { Item?: T };

        return getCommandOutput.Item;
    } catch (err) {
        console.error('DynamoDb getByEmail', err);
        return Promise.reject();
    }
}

export const getByField = async (tableName: string, fieldName: string, fieldValue: string): Promise<ScanCommandOutput> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: ScanCommandInput = {
        TableName: tableName,
        FilterExpression: `${fieldName} = :field`,
        ExpressionAttributeValues: { ':field': fieldValue },
    };

    try {
        return await dynamoDBDocumentClient.send(new ScanCommand(input));
    } catch (err) {
        console.error(err);
        return Promise.reject(null);
    }
}

export const postItem = async (tableName: string, itemToPost: object): Promise<PutCommandOutput> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: PutCommandInput = {
        TableName: tableName,
        Item: itemToPost
    };

    try {
        return await dynamoDBDocumentClient.send(new PutCommand(input));
    } catch (err) {
        console.log("Error message of dynamoDB");
        console.error(err);
        return Promise.reject(null);
    }
}

export const deleteItem = async (tableName: string, itemId: string, sortKey: string): Promise<void> => {
    const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDbClient);

    const input: DeleteCommandInput = {
        Key: {
            id: { itemId },
            email: { sortKey }
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