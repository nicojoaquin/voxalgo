/*
  Warnings:

  - You are about to drop the column `promt` on the `Assistant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sipUri]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Assistant" DROP COLUMN "promt",
ADD COLUMN     "analysisPlan" JSONB,
ADD COLUMN     "backgroundDenoisingEnabled" BOOLEAN,
ADD COLUMN     "backgroundSound" TEXT,
ADD COLUMN     "endCallFunctionEnabled" BOOLEAN,
ADD COLUMN     "endCallMessage" TEXT,
ADD COLUMN     "endCallPhrases" JSONB,
ADD COLUMN     "firstMessage" TEXT,
ADD COLUMN     "llmRequestDelaySeconds" INTEGER,
ADD COLUMN     "maxDurationSeconds" INTEGER,
ADD COLUMN     "messagePlan" JSONB,
ADD COLUMN     "numWordsToInterruptAssistant" INTEGER,
ADD COLUMN     "prompt" TEXT,
ADD COLUMN     "responseDelaySeconds" INTEGER,
ADD COLUMN     "serverMessages" JSONB,
ADD COLUMN     "serverUrl" TEXT,
ADD COLUMN     "silenceTimeoutSeconds" INTEGER;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "preCallFunctions" JSONB,
ADD COLUMN     "sipUri" TEXT;

-- CreateTable
CREATE TABLE "AssistantConfig" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "version" TEXT,
    "name" TEXT,
    "voice" TEXT,
    "transcriber" TEXT,
    "model" JSONB,
    "firstMessage" TEXT,
    "endCallMessage" TEXT,
    "endCallFunctionEnabled" BOOLEAN,
    "silenceTimeoutSeconds" INTEGER,
    "serverMessages" JSONB,
    "responseDelaySeconds" INTEGER,
    "serverUrl" TEXT,
    "endCallPhrases" JSONB,
    "llmRequestDelaySeconds" INTEGER,
    "maxDurationSeconds" INTEGER,
    "numWordsToInterruptAssistant" INTEGER,
    "backgroundSound" TEXT,
    "analysisPlan" JSONB,
    "backgroundDenoisingEnabled" BOOLEAN,
    "messagePlan" JSONB,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "AssistantConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssistantConfig_clientId_key" ON "AssistantConfig"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_sipUri_key" ON "Client"("sipUri");

-- AddForeignKey
ALTER TABLE "AssistantConfig" ADD CONSTRAINT "AssistantConfig_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
