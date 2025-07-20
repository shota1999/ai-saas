/*
  Warnings:

  - A unique constraint covering the columns `[userId,date]` on the table `UsageStat` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UsageStat_userId_date_key" ON "UsageStat"("userId", "date");
