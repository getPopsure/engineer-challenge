/*
  Warnings:

  - You are about to drop the column `customerId` on the `Policy` table. All the data in the column will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientId` to the `Policy` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Relation" AS ENUM ('SELF', 'MOTHER', 'FATHER', 'HUSBAND', 'WIFE', 'DAUGHTER', 'SON', 'OTHER');

-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_customerId_fkey";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "customerId",
ADD COLUMN     "clientId" UUID NOT NULL;

-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "Person" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Person_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PolicyDependants" (
    "id" UUID NOT NULL,
    "relation" "Relation" NOT NULL,
    "policyId" UUID NOT NULL,
    "dependantId" UUID NOT NULL,

    CONSTRAINT "PolicyDependants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Person_firstName_lastName_idx" ON "Person"("firstName", "lastName");

-- CreateIndex
CREATE INDEX "Policy_provider_idx" ON "Policy"("provider");

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyDependants" ADD CONSTRAINT "PolicyDependants_dependantId_fkey" FOREIGN KEY ("dependantId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyDependants" ADD CONSTRAINT "PolicyDependants_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
