import * as dynamoose from 'dynamoose'

const isDevEnv = process.env.NODE_ENV === 'dev' || !process.env.NODE_ENV;

export function setupDynamoDB() {
  if (!isDevEnv) {
    const ddb = new dynamoose.aws.ddb.DynamoDB({
      "credentials": {
        "accessKeyId": "AKID",
        "secretAccessKey": "SECRET"
      },
      "region": "us-east-1"
    });

    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb);
  } else {
    console.log('Connecting in Dynamodb local');
    dynamoose.aws.ddb.local();
  }
}
