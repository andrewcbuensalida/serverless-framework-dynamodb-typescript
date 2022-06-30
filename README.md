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