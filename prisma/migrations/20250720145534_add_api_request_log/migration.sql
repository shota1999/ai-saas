-- CreateTable
CREATE TABLE "ApiRequestCounterLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiRequestCounterLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApiRequestCounterLog" ADD CONSTRAINT "ApiRequestCounterLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
