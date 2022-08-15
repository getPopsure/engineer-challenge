import * as dynamoose from 'dynamoose'
const sdk = dynamoose.aws.sdk // require("aws-sdk");
sdk.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
})
// Dynamodb connection configuration. Only setup for local as of now
dynamoose.aws.ddb.local(process.env.DYNAMODB_URL || 'http://dynamodb:8000')

/**
 * Dynamodb schema to store family member history
 */
const familyHistorySchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    memberId: {
      type: String,
      index: {
        name: 'memberIdIndex',
        global: true,
      },
    },
    policyId: {
      type: String,
      index: {
        name: 'policyIdIndex',
        global: true,
      },
    },
    firstName: {
      type: String,
      required: false,
      index: {
        name: 'firstNameIndex',
        global: true,
      },
    },
    lastName: {
      type: String,
      index: {
        name: 'lastNameIndex',
        global: true,
      },
    },
    dateOfBirth: {
      type: String,
      required: false,
    },
  },
  {
    saveUnknown: true,
    timestamps: true,
  },
)

export const FamilyHistory = dynamoose.model(
  'FamilyHistory',
  familyHistorySchema,
  {
    create: true,
  },
)
