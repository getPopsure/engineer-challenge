-- CreateTable
CREATE TABLE "PolicyRelative" (
    "id" UUID NOT NULL,
    "role" VARCHAR(255) NOT NULL,
    "policyId" UUID NOT NULL,
    "relativeId" UUID NOT NULL,

    CONSTRAINT "PolicyRelative_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Customer_firstName_lastName_idx" ON "Customer"("firstName", "lastName");

-- CreateIndex
CREATE INDEX "Policy_insuranceType_provider_status_idx" ON "Policy"("insuranceType", "provider", "status");

-- AddForeignKey
ALTER TABLE "PolicyRelative" ADD CONSTRAINT "PolicyRelative_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PolicyRelative" ADD CONSTRAINT "PolicyRelative_relativeId_fkey" FOREIGN KEY ("relativeId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
