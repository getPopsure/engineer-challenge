import * as dynamoose from 'dynamoose'
const sdk = dynamoose.aws.sdk // require("aws-sdk");
sdk.config.update({
  accessKeyId: 'AKID',
  secretAccessKey: 'SECRET',
  region: 'us-east-1',
})

dynamoose.aws.ddb.local('http://dynamodb:8000')

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
