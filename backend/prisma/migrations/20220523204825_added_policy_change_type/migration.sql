/*
  Warnings:

  - Added the required column `policyChangeType` to the `PolicyHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PolicyChangeType" AS ENUM ('UPDATE', 'DELETE');

-- AlterTable
ALTER TABLE "PolicyHistory"
  ADD COLUMN "policyChangeType" "PolicyChangeType" NOT NULL;
