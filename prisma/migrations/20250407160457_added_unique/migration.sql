/*
  Warnings:

  - A unique constraint covering the columns `[stripeId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Account_stripeId_key" ON "Account"("stripeId");
