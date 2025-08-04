/*
  Warnings:

  - You are about to drop the `Plans` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Plan" ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Plans";

-- CreateIndex
CREATE UNIQUE INDEX "Plan_slug_key" ON "public"."Plan"("slug");
