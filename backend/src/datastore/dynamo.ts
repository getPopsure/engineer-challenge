import * as dynamoose from 'dynamoose'

export const connectDynamodb = async () => {
  const sdk = dynamoose.aws.sdk // require("aws-sdk");
  sdk.config.update({
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REGION,
  })
  // Dynamodb connection configuration. Only setup for local as of now
  dynamoose.aws.ddb.local(process.env.DYNAMODB_URL || 'http://dynamodb:8000')
}
