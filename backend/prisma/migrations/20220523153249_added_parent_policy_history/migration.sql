-- CreateTable
CREATE TABLE "PolicyHistory"
(
  "id"              UUID            NOT NULL,
  "policyId"        TEXT            NOT NULL,
  "customerId"      TEXT            NOT NULL,
  "policyCreatedAt" TIMESTAMP(3)    NOT NULL,
  "provider"        TEXT            NOT NULL,
  "insuranceType"   "InsuranceType" NOT NULL,
  "status"          "PolicyStatus"  NOT NULL,
  "startDate"       TIMESTAMP(3)    NOT NULL,
  "endDate"         TIMESTAMP(3),
  "createdAt"       TIMESTAMP(3)    NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "PolicyHistory_pkey" PRIMARY KEY ("id")
);
