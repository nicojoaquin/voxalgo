/*
  Warnings:

  - The primary key for the `Assistant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `analysisPlan` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundDenoisingEnabled` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundSound` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `endCallFunctionEnabled` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `endCallMessage` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `endCallPhrases` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `firstMessage` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `llmRequestDelaySeconds` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `maxDurationSeconds` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `messagePlan` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `numWordsToInterruptAssistant` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `outboundJson` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `responseDelaySeconds` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `serverMessages` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `serverUrl` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `silenceTimeoutSeconds` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `transcriber` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `voice` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `callId` on the `Billing` table. All the data in the column will be lost.
  - You are about to drop the column `assistant` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `callId` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `generatedLead` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `CallLog` table. All the data in the column will be lost.
  - You are about to drop the column `preCallFunctions` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the `AssistantConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Call` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InboundCall` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OutboundCall` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TremOutcome` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clientPhoneId]` on the table `Assistant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `base` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPhoneId` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `direction` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `knowledgeBase` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tools` to the `Assistant` table without a default value. This is not possible if the table is not empty.
  - Made the column `version` on table `Assistant` required. This step will fail if there are existing NULL values in that column.
  - Made the column `prompt` on table `Assistant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "AssistantConfig" DROP CONSTRAINT "AssistantConfig_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Billing" DROP CONSTRAINT "Billing_callId_fkey";

-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_clientId_fkey";

-- DropForeignKey
ALTER TABLE "CallLog" DROP CONSTRAINT "CallLog_callId_fkey";

-- DropForeignKey
ALTER TABLE "InboundCall" DROP CONSTRAINT "InboundCall_callId_fkey";

-- DropForeignKey
ALTER TABLE "InboundCall" DROP CONSTRAINT "InboundCall_customerId_fkey";

-- DropForeignKey
ALTER TABLE "OutboundCall" DROP CONSTRAINT "OutboundCall_callId_fkey";

-- DropForeignKey
ALTER TABLE "OutboundCall" DROP CONSTRAINT "OutboundCall_leadId_fkey";

-- DropForeignKey
ALTER TABLE "TremOutcome" DROP CONSTRAINT "TremOutcome_leadId_fkey";

-- DropIndex
DROP INDEX "Billing_callId_key";

-- DropIndex
DROP INDEX "CallLog_callId_key";

-- AlterTable
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_pkey",
DROP COLUMN "analysisPlan",
DROP COLUMN "backgroundDenoisingEnabled",
DROP COLUMN "backgroundSound",
DROP COLUMN "endCallFunctionEnabled",
DROP COLUMN "endCallMessage",
DROP COLUMN "endCallPhrases",
DROP COLUMN "firstMessage",
DROP COLUMN "id",
DROP COLUMN "llmRequestDelaySeconds",
DROP COLUMN "maxDurationSeconds",
DROP COLUMN "messagePlan",
DROP COLUMN "model",
DROP COLUMN "name",
DROP COLUMN "numWordsToInterruptAssistant",
DROP COLUMN "outboundJson",
DROP COLUMN "responseDelaySeconds",
DROP COLUMN "serverMessages",
DROP COLUMN "serverUrl",
DROP COLUMN "silenceTimeoutSeconds",
DROP COLUMN "transcriber",
DROP COLUMN "voice",
ADD COLUMN     "base" JSONB NOT NULL,
ADD COLUMN     "clientPhoneId" TEXT NOT NULL,
ADD COLUMN     "direction" TEXT NOT NULL,
ADD COLUMN     "knowledgeBase" TEXT NOT NULL,
ADD COLUMN     "postCallFunctions" JSONB,
ADD COLUMN     "preCallFunctions" JSONB,
ADD COLUMN     "tools" JSONB NOT NULL,
ALTER COLUMN "version" SET NOT NULL,
ALTER COLUMN "prompt" SET NOT NULL,
ADD CONSTRAINT "Assistant_pkey" PRIMARY KEY ("clientPhoneId", "direction", "version");

-- AlterTable
ALTER TABLE "Billing" DROP COLUMN "callId";

-- AlterTable
ALTER TABLE "CallLog" DROP COLUMN "assistant",
DROP COLUMN "callId",
DROP COLUMN "generatedLead",
DROP COLUMN "language";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "preCallFunctions";

-- DropTable
DROP TABLE "AssistantConfig";

-- DropTable
DROP TABLE "Call";

-- DropTable
DROP TABLE "InboundCall";

-- DropTable
DROP TABLE "Lead";

-- DropTable
DROP TABLE "OutboundCall";

-- DropTable
DROP TABLE "TremOutcome";

-- DropEnum
DROP TYPE "CallStatus";

-- CreateTable
CREATE TABLE "ClientPhone" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "phoneId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "ClientPhone_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientPhone_phoneId_key" ON "ClientPhone"("phoneId");

-- CreateIndex
CREATE UNIQUE INDEX "ClientPhone_clientId_key" ON "ClientPhone"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Assistant_clientPhoneId_key" ON "Assistant"("clientPhoneId");
