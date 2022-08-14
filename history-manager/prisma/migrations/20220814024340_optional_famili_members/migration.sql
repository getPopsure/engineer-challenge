-- DropForeignKey
ALTER TABLE "FamilyMember" DROP CONSTRAINT "FamilyMember_policyId_fkey";

-- AlterTable
ALTER TABLE "FamilyMember" ALTER COLUMN "policyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PolicyHistory" ALTER COLUMN "customer" DROP NOT NULL,
ALTER COLUMN "familyMembers" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FamilyMember" ADD CONSTRAINT "FamilyMember_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
