-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('Queued', 'Ringing', 'InProgress', 'Forwarding', 'Ended');

-- CreateTable
CREATE TABLE "Assistant" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "version" TEXT,
    "name" TEXT,
    "promt" TEXT,
    "outboundJson" JSONB,
    "voice" TEXT,
    "transcriber" TEXT,
    "model" JSONB,

    CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "industry" TEXT NOT NULL,
    "phoneId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "orgId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "CallStatus" NOT NULL,
    "provider" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "recordingUrl" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InboundCall" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "sourceNumber" TEXT NOT NULL,
    "callerName" TEXT NOT NULL,
    "reasonForCall" TEXT NOT NULL,
    "customerId" TEXT,
    "callId" TEXT NOT NULL,

    CONSTRAINT "InboundCall_pkey" PRIMARY KEY ("callId")
);

-- CreateTable
CREATE TABLE "OutboundCall" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "destinationNumber" TEXT NOT NULL,
    "timeZone" TEXT NOT NULL,
    "scheduleTime" TIMESTAMP(3) NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "outboundPurpose" TEXT NOT NULL,
    "leadId" TEXT,
    "callId" TEXT NOT NULL,

    CONSTRAINT "OutboundCall_pkey" PRIMARY KEY ("callId")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "curStatus" TEXT NOT NULL,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TremOutcome" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "outcome" TEXT NOT NULL,
    "countRetry" INTEGER NOT NULL DEFAULT 0,
    "nextCallDelay" INTEGER NOT NULL,
    "newLeadActive" BOOLEAN NOT NULL,
    "reqManualInteraction" BOOLEAN NOT NULL,
    "leadId" TEXT,

    CONSTRAINT "TremOutcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CallLog" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "timestamp" TIMESTAMP(3) NOT NULL,
    "orgId" TEXT NOT NULL,
    "endedReason" TEXT NOT NULL,
    "structuredData" JSONB NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "assistant" TEXT NOT NULL,
    "generatedLead" BOOLEAN NOT NULL,
    "callId" TEXT,

    CONSTRAINT "CallLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "number" TEXT NOT NULL,
    "phoneId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apiToken" TEXT NOT NULL,
    "clientId" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Billing" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "billingDate" TIMESTAMP(3) NOT NULL,
    "callId" TEXT,
    "clientId" TEXT,

    CONSTRAINT "Billing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrePaidBilling" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "balanceRemaining" DOUBLE PRECISION NOT NULL,
    "rechargeAmount" DOUBLE PRECISION NOT NULL,
    "lastRechargeDate" TIMESTAMP(3) NOT NULL,
    "billingId" TEXT NOT NULL,

    CONSTRAINT "PrePaidBilling_pkey" PRIMARY KEY ("billingId")
);

-- CreateTable
CREATE TABLE "PostPaidBilling" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3) NOT NULL,
    "creditLimit" DOUBLE PRECISION NOT NULL,
    "overdueChanges" DOUBLE PRECISION NOT NULL,
    "billingCycle" TEXT NOT NULL,
    "lastPaymentDate" TIMESTAMP(3) NOT NULL,
    "billingId" TEXT NOT NULL,

    CONSTRAINT "PostPaidBilling_pkey" PRIMARY KEY ("billingId")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_phoneId_key" ON "Client"("phoneId");

-- CreateIndex
CREATE UNIQUE INDEX "InboundCall_callId_key" ON "InboundCall"("callId");

-- CreateIndex
CREATE UNIQUE INDEX "OutboundCall_callId_key" ON "OutboundCall"("callId");

-- CreateIndex
CREATE UNIQUE INDEX "CallLog_callId_key" ON "CallLog"("callId");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_code_key" ON "Customer"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_phoneId_key" ON "Customer"("phoneId");

-- CreateIndex
CREATE UNIQUE INDEX "Billing_callId_key" ON "Billing"("callId");

-- CreateIndex
CREATE UNIQUE INDEX "PrePaidBilling_billingId_key" ON "PrePaidBilling"("billingId");

-- CreateIndex
CREATE UNIQUE INDEX "PostPaidBilling_billingId_key" ON "PostPaidBilling"("billingId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InboundCall" ADD CONSTRAINT "InboundCall_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InboundCall" ADD CONSTRAINT "InboundCall_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutboundCall" ADD CONSTRAINT "OutboundCall_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutboundCall" ADD CONSTRAINT "OutboundCall_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TremOutcome" ADD CONSTRAINT "TremOutcome_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallLog" ADD CONSTRAINT "CallLog_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Billing" ADD CONSTRAINT "Billing_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrePaidBilling" ADD CONSTRAINT "PrePaidBilling_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostPaidBilling" ADD CONSTRAINT "PostPaidBilling_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "Billing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
