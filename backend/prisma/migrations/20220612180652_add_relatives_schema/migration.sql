-- CreateTable
CREATE TABLE "Relative" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "policyId" UUID NOT NULL,

    CONSTRAINT "Relative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Relative_policyId_key" ON "Relative"("policyId");

-- AddForeignKey
ALTER TABLE "Relative" ADD CONSTRAINT "Relative_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
