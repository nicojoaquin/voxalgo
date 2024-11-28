/*
  Warnings:

  - You are about to drop the column `analysisPlan` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundDenoisingEnabled` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundSound` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `endCallMessage` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `endCallPhrases` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `llmRequestDelaySeconds` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `maxDurationSeconds` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `messagePlan` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `numWordsToInterruptAssistant` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `responseDelaySeconds` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `serverMessages` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `silenceTimeoutSeconds` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `AssistantConfig` table. All the data in the column will be lost.
  - You are about to drop the column `voice` on the `AssistantConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AssistantConfig" DROP COLUMN "analysisPlan",
DROP COLUMN "backgroundDenoisingEnabled",
DROP COLUMN "backgroundSound",
DROP COLUMN "endCallMessage",
DROP COLUMN "endCallPhrases",
DROP COLUMN "llmRequestDelaySeconds",
DROP COLUMN "maxDurationSeconds",
DROP COLUMN "messagePlan",
DROP COLUMN "name",
DROP COLUMN "numWordsToInterruptAssistant",
DROP COLUMN "responseDelaySeconds",
DROP COLUMN "serverMessages",
DROP COLUMN "silenceTimeoutSeconds",
DROP COLUMN "version",
DROP COLUMN "voice";
