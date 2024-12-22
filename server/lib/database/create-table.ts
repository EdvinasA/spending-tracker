import { DynamoDBClient, CreateTableCommand, CreateTableCommandInput } from '@aws-sdk/client-dynamodb';

// Create a DynamoDB client
const dynamoDbClient = new DynamoDBClient({
    region: process.env.REGION || 'us-east-1',
    endpoint: process.env.ENDPOINT || "http://localhost:8000",
    credentials: {
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretKey"
    }
});

const createTable = async () => {
    const params: CreateTableCommandInput[] = [
        {
            TableName: 'Users',
            KeySchema: [
                { AttributeName: "email", KeyType: "HASH" }
            ],
            AttributeDefinitions: [
                { AttributeName: "email", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        },
        {
            TableName: 'Expenses',
            KeySchema: [
                { AttributeName: "id", KeyType: "HASH" },
                { AttributeName: "email", KeyType: "RANGE" }
            ],
            AttributeDefinitions: [
                { AttributeName: "id", AttributeType: "S" },
                { AttributeName: "email", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5
            }
        }
    ];

    try {
        params.map(async (table: CreateTableCommandInput) => {
            console.log("Creating table...");
            const data = await dynamoDbClient.send(new CreateTableCommand(table));
            console.log("Table created successfully:", data);
        });
    } catch (error) {
        console.error("Error creating table:", error);
    }
};

createTable();