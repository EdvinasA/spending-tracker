import express, { Request, Response } from 'express';
import cors from 'cors';
import { APIGatewayEvent, APIGatewayProxyCallback, Context } from 'aws-lambda';
import { handler as getUser } from './lib/user/controller';
import { handler as postUser } from './lib/user/post/controller';
import { handler as createCategory } from './lib/category/create-category/controller';
import { handler as getCategory } from "./lib/category/get-category/controller";

const app = express();

app.use(express.json());
app.use(cors())

const expressToLambdaEvent = (req: Request): APIGatewayEvent => {
    return {
        resource: req.path,
        path: req.path,
        httpMethod: req.method,
        headers: req.headers,
        queryStringParameters: req.query as Record<string, string>,
        pathParameters: req.params,
        stageVariables: null,
        requestContext: {} as any,
        body: req.body ? JSON.stringify(req.body) : null,
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: {}
    };
};


export const handleLambdaResponse = (res: Response, error: any, result: any) => {
    res.status(result?.statusCode || 200).send(result?.body ? JSON.parse(result.body) : {});
};

const handleLambdaRoute = (lambdaHandler: Function) => async (req: Request, res: Response) => {
    const event = expressToLambdaEvent(req);
    const context: Context = {} as Context;

    const callback: APIGatewayProxyCallback = (error, result) => {
        handleLambdaResponse(res, error, result);
    };

    // Invoke the Lambda handler
    try {
        await lambdaHandler(event, context, callback);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


app.get('/user/:email', handleLambdaRoute(getUser));
app.post('/user', handleLambdaRoute(postUser));
app.post('/category', handleLambdaRoute(createCategory));
app.get('/category/:email', handleLambdaRoute(getCategory));

// Start the app locally for development
if (process.env.NODE_ENV !== 'production') {
    const PORT = 3001;
    app.listen(PORT, () => {
        console.log(`Server is running locally on http://localhost:${PORT}`);
    });
}
