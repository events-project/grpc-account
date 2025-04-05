/*
  Warnings:

  - You are about to drop the `MonthlyCreditUsage` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `CreditUsage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('EVENT', 'WEBHOOK', 'API_CALL');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED');

-- AlterTable
ALTER TABLE "CreditUsage" ADD COLUMN     "credits" BIGINT NOT NULL DEFAULT 0,
ALTER COLUMN "id" DROP DEFAULT,
DROP COLUMN "type",
ADD COLUMN     "type" "UsageType" NOT NULL;

-- DropTable
DROP TABLE "MonthlyCreditUsage";

-- CreateTable
CREATE TABLE "PeriodCreditUsage" (
    "id" TEXT NOT NULL,
    "appId" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "credits" BIGINT NOT NULL DEFAULT 0,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PeriodCreditUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PeriodCreditUsage_appId_start_end_key" ON "PeriodCreditUsage"("appId", "start", "end");

-- AddForeignKey
ALTER TABLE "CreditUsage" ADD CONSTRAINT "CreditUsage_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
