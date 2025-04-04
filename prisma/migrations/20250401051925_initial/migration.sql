-- CreateEnum
CREATE TYPE "SecretType" AS ENUM ('SECRET_KEY', 'PUBLISHABLE_KEY');

-- CreateTable
CREATE TABLE "Account"
(
    "id"        TEXT         NOT NULL,
    "credits"   BIGINT       NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Secret"
(
    "id"        TEXT         NOT NULL,
    "type"      "SecretType" NOT NULL,
    "secret"    TEXT         NOT NULL,
    "hash"      TEXT         NOT NULL,
    "accountId" TEXT         NOT NULL,
    "isActive"  BOOLEAN      NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "Secret_pkey" PRIMARY KEY ("id")
);

-- CreditUsage table
CREATE TABLE "CreditUsage"
(
    "id"        TEXT PRIMARY KEY      DEFAULT gen_random_uuid(),
    "appId"     TEXT         NOT NULL,
    "type"      TEXT         NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- MonthlyCreditUsage table
CREATE TABLE "MonthlyCreditUsage"
(
    "id"        TEXT PRIMARY KEY      DEFAULT gen_random_uuid(),
    "appId"     TEXT         NOT NULL,
    "month"     TEXT         NOT NULL,
    "credits"   BIGINT       NOT NULL DEFAULT 0,
    "isPaid"    BOOLEAN      NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "appId_month" UNIQUE ("appId", "month")
);


-- CreateIndex
CREATE UNIQUE INDEX "Secret_secret_key" ON "Secret" ("secret");

-- CreateIndex
CREATE UNIQUE INDEX "Secret_hash_key" ON "Secret" ("hash");

-- AddForeignKey
ALTER TABLE "Secret"
    ADD CONSTRAINT "Secret_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE;
