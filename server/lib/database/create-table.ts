import { DynamoDBClient, CreateTableCommand, CreateTableCommandInput, DescribeTableCommand } from '@aws-sdk/client-dynamodb';

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
            TableName: 'Categories',
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
        for (const table of params) {
            try {
                console.log(`Checking if table ${table.TableName} exists...`);
                await dynamoDbClient.send(new DescribeTableCommand({ TableName: table.TableName }));
                console.log(`Table ${table.TableName} already exists. Skipping creation.`);
            } catch (error: any) {
                if (error.name === 'ResourceNotFoundException') {
                    console.log(`Creating table ${table.TableName}...`);
                    const data = await dynamoDbClient.send(new CreateTableCommand(table));
                    console.log("Table created successfully:", data);
                } else {
                    console.error("Error checking table existence:", error);
                    throw error;
                }
            }
        }
    } catch (error) {
        console.error("Error processing tables:", error);
    }
};

createTable();