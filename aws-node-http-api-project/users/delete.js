"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const dynamoDb = new aws_sdk_1.DynamoDB.DocumentClient();
module.exports.delete = (event, context, callback) => {
    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
        //#id gets assigned to the string id, #id replaces #id in ConditionExpression below.
        ExpressionAttributeNames: {
            "#id": "id",
        },
        ExpressionAttributeValues: {
            ":id": event.pathParameters.id,
        },
        ConditionExpression: "#id = :id",
        ReturnValues: "ALL_OLD",
    };
    // update the user in the database
    dynamoDb.delete(params, (error, result) => {
        // handle potential errors
        if (error) {
            console.error(error);
            callback(null, {
                statusCode: error.statusCode || 501,
                headers: { "Content-Type": "text/plain" },
                body: "Couldn't fetch the user item.",
            });
            return;
        }
        // create a response
        const response = {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
        callback(null, response);
    });
};
