const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async () => {
    const params = {
        TableName: process.env.COFFEE_ORDERS_TABLE,
    };

    try {
        const result = await dynamoDb.scan(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `Could not fetch orders: ${error.message}` }),
        };
    }
}