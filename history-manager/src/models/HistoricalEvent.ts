import * as dynamoose from 'dynamoose'
const sdk = dynamoose.aws.sdk // require("aws-sdk");
sdk.config.update({
  accessKeyId: 'AKID',
  secretAccessKey: 'SECRET',
  region: 'us-east-1',
})

dynamoose.aws.ddb.local('http://dynamodb:8000')

const historicalEventSchema = new dynamoose.Schema(
  {
    id: {
      type: String,
      hashKey: true,
    },
    policyId: {
      type: String,
      index: {
        name: 'policyIdIndex',
        global: true,
      },
    },
    provider: {
      type: String,
      required: false,
    },
    eventType: {
      type: String,
    },
    insuranceType: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    startDate: {
      type: String,
      required: false,
    },
    endDate: {
      type: String,
      required: false,
    },
    customer: Object,
    familyMembers: { type: Array, default: () => [] },
  },
  {
    saveUnknown: true,
    timestamps: true,
  },
)

export const HistoricalEvent = dynamoose.model(
  'HistoricalEvent',
  historicalEventSchema,
  {
    create: true,
  },
)
