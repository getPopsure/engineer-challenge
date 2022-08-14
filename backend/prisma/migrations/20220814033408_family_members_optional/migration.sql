/*
  Warnings:

  - You are about to drop the column `customerHistoryId` on the `PolicyHistory` table. All the data in the column will be lost.
  - You are about to drop the `CustomerHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FamilyMemberHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FamilyMember" DROP CONSTRAINT "FamilyMember_policyId_fkey";

-- DropForeignKey
ALTER TABLE "FamilyMemberHistory" DROP CONSTRAINT "FamilyMemberHistory_policyHistoryId_fkey";

-- DropForeignKey
ALTER TABLE "PolicyHistory" DROP CONSTRAINT "PolicyHistory_customerHistoryId_fkey";

-- AlterTable
ALTER TABLE "FamilyMember" ALTER COLUMN "policyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PolicyHistory" DROP COLUMN "customerHistoryId",
ADD COLUMN     "customer" JSONB,
ADD COLUMN     "familyMembers" JSONB;

-- DropTable
DROP TABLE "CustomerHistory";

-- DropTable
DROP TABLE "FamilyMemberHistory";

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
