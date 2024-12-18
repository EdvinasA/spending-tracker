import {APIGatewayEvent, APIGatewayProxyCallback, Context} from "aws-lambda";
import {postItem} from "../../shared/database";

export async function handler(event: APIGatewayEvent, _: Context, callback: APIGatewayProxyCallback) {
    try {
        // Get user data from request body
        const requestBody = JSON.parse(event.body || '{}');
        const email = requestBody.email;

        if (!email) {
            callback(null, { statusCode: 400, body: JSON.stringify({ message: "Email is required" }) });
            return;
        }
        // User Object
        const user = {
            email: email,
            createdAt: new Date().toISOString()
        };

        // Save user to database
        await postItem('Users', user);

        // Return success response
        callback(null, { statusCode: 200, body: JSON.stringify({ message: "User saved successfully", data: user }) });
    } catch (e) {
        console.error(e);
        callback(null, { statusCode: 500, body: JSON.stringify({ message: "Error saving user" }) });
    }
}