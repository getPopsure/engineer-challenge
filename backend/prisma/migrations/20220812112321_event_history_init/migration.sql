-- CreateEnum
CREATE TYPE "ServiceEvents" AS ENUM ('CUSTOMER_UPDATED', 'POLICY_UPDATED', 'FAMILY_MEMBER_UPDATED');

-- CreateTable
CREATE TABLE "PolicyHistory" (
    "id" UUID NOT NULL,
    "policyId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "eventType" "ServiceEvents" NOT NULL,
    "insuranceType" "InsuranceType" NOT NULL,
    "status" "PolicyStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerHistoryId" UUID,

    CONSTRAINT "PolicyHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerHistory" (
    "id" UUID NOT NULL,
    "customerId" TEXT NOT NULL,
    "eventType" "ServiceEvents" NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMemberHistory" (
    "id" UUID NOT NULL,
    "memberId" TEXT NOT NULL,
    "eventType" "ServiceEvents" NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "policyHistoryId" UUID,

    CONSTRAINT "FamilyMemberHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PolicyHistory" ADD CONSTRAINT "PolicyHistory_customerHistoryId_fkey" FOREIGN KEY ("customerHistoryId") REFERENCES "CustomerHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMemberHistory" ADD CONSTRAINT "FamilyMemberHistory_policyHistoryId_fkey" FOREIGN KEY ("policyHistoryId") REFERENCES "PolicyHistory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
