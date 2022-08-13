-- CreateEnum
CREATE TYPE "ServiceEvents" AS ENUM ('CUSTOMER_UPDATED', 'POLICY_UPDATED', 'FAMILY_MEMBER_UPDATED');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('ACTIVE', 'PENDING', 'CANCELLED', 'DROPPED_OUT');

-- CreateEnum
CREATE TYPE "InsuranceType" AS ENUM ('LIABILITY', 'HOUSEHOLD', 'HEALTH');

-- CreateTable
CREATE TABLE "Customer" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" UUID NOT NULL,
    "customerId" UUID NOT NULL,
    "provider" TEXT NOT NULL,
    "insuranceType" "InsuranceType" NOT NULL,
    "status" "PolicyStatus" NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FamilyMember" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "policyId" UUID NOT NULL,

    CONSTRAINT "FamilyMember_pkey" PRIMARY KEY ("id")
);

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
    "customer" JSONB NOT NULL,
    "familyMembers" JSONB NOT NULL,

    CONSTRAINT "PolicyHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
