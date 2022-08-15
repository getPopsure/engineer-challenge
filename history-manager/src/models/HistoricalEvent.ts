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
 * Policy Snapshot schema
 */
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
