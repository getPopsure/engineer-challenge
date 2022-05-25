/*
  Warnings:

  - Changed the type of `policyId` on the `PolicyHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Policy"
  ADD COLUMN "deleted"       BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "familyMembers" JSONB;

-- AlterTable
ALTER TABLE "PolicyHistory"
  ADD COLUMN "familyMembers" JSONB,
  DROP COLUMN "policyId",
  ADD COLUMN "policyId"      UUID NOT NULL,
  ALTER COLUMN "policyChangeType" SET DEFAULT E'UPDATE';

-- AddForeignKey
ALTER TABLE "PolicyHistory"
  ADD CONSTRAINT "PolicyHistory_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
