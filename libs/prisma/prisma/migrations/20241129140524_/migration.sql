/*
  Warnings:

  - You are about to drop the column `phoneId` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[masterClientId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contactNumber` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masterClientId` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `ClientPhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `ClientPhone` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Client_phoneId_key";

-- DropIndex
DROP INDEX "ClientPhone_clientId_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "phoneId",
ADD COLUMN     "contactNumber" TEXT NOT NULL,
ADD COLUMN     "masterClientId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ClientPhone" ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ALTER COLUMN "clientId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_masterClientId_key" ON "Client"("masterClientId");

-- AddForeignKey
ALTER TABLE "ClientPhone" ADD CONSTRAINT "ClientPhone_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assistant" ADD CONSTRAINT "Assistant_clientPhoneId_fkey" FOREIGN KEY ("clientPhoneId") REFERENCES "ClientPhone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
