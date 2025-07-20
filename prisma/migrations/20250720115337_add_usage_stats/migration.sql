-- CreateTable
CREATE TABLE "UsageStat" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "creditsUsed" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsageStat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UsageStat" ADD CONSTRAINT "UsageStat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
