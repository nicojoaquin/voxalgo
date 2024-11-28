/*
  Warnings:

  - Added the required column `transcriber` to the `AssistantConfig` table without a default value. This is not possible if the table is not empty.
  - Made the column `model` on table `AssistantConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstMessage` on table `AssistantConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endCallFunctionEnabled` on table `AssistantConfig` required. This step will fail if there are existing NULL values in that column.
  - Made the column `serverUrl` on table `AssistantConfig` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AssistantConfig" DROP COLUMN "transcriber",
ADD COLUMN     "transcriber" JSONB NOT NULL,
ALTER COLUMN "model" SET NOT NULL,
ALTER COLUMN "firstMessage" SET NOT NULL,
ALTER COLUMN "endCallFunctionEnabled" SET NOT NULL,
ALTER COLUMN "serverUrl" SET NOT NULL;
