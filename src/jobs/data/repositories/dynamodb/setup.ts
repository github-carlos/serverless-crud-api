import * as dynamoose from 'dynamoose'
import { isDevEnv, isProdEnv } from '../../../../shared/utils'

export function setupDynamoDB() {
  if (isProdEnv) {
    const ddb = new dynamoose.aws.ddb.DynamoDB()
    // Set DynamoDB instance to the Dynamoose DDB instance
    dynamoose.aws.ddb.set(ddb)
  } else if (isDevEnv) {
    console.log('Connecting in Dynamodb local')
    dynamoose.aws.ddb.local()
  }
}
