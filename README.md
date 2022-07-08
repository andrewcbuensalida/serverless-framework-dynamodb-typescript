https://www.serverless.com/framework/docs/tutorial

In command prompt
    serverless
This asks you about configuration, then creates a folder with handler.js, which has your lambda function, and serverless.yml which are instructions on what resources aws will deploy
If you already have aws credentials on your machine, it will skip the asking of your access keys
then
    serverless deploy
This will deploy resources to aws and output the url to the dashboard and endpoint. it will create an s3 bucket and put meta data and zip of the resources in there.
Now you can test your endpoint in wsl with
    curl https://neg42flftc.execute-api.us-east-1.amazonaws.com/

To destroy resources, cd into serverless folder, then 
    serverless remove
    OR more specifically
    serverless remove --stage dev --region us-east-1
Note that it wont delete a resource if the resource has DeletionPolicy: retain

For typescript dynamodb, followed this, but the only thing wrong was their imports, used the import technique from the other folders, and newer versions
https://github.com/serverless/examples/tree/v3/aws-node-http-api-typescript-dynamodb


////////////////////////////
workflow
To convert ts files to js,
    npm run watch
    
when testing the lambda in aws console, event json has to be in the format below because json parse
    {
        "body": "{\"username\": \"George123\"}"
    }

when testing locally, event.json is the test inputs
    serverless invoke local --function <function name eg. create> --path event.json

To deploy only a specific function
    serverless deploy --function <function name eg. delete>
    
But if changing the serverless.yml, need to do
    serverless deploy

////////////////////////////////////////
if you do serverless deploy again before you serverless remove, it won't double the resources, it won't remove the existing resources, just the existing lambdas. It doesn't change the endpoint.

//////////////////////////////////
parameters are key values from cli or serverless.yml that are injected into other parts of serverless.yml, useful for secrets.
variables are dynamic values inserted into serverless.yml. parameters is a type of variable.