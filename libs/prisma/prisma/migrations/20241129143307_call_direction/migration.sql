/*
  Warnings:

  - The primary key for the `Assistant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `direction` on the `Assistant` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CallDirection" AS ENUM ('Inbound', 'Outbound');

-- AlterTable
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_pkey",
DROP COLUMN "direction",
ADD COLUMN     "direction" "CallDirection" NOT NULL,
ADD CONSTRAINT "Assistant_pkey" PRIMARY KEY ("clientPhoneId", "direction", "version");
