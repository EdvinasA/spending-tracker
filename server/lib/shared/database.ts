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

const dynamoDbClient = new DynamoDBClient({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    credentials: {
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretKey"
    }
  });

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