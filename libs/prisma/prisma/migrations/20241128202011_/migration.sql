/*
  Warnings:

  - You are about to drop the column `sipUri` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sipUri]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Client_sipUri_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "sipUri";

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "sipUri" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Customer_sipUri_key" ON "Customer"("sipUri");
