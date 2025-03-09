-- CreateEnum
CREATE TYPE "ProposalStatus" AS ENUM ('CREATED', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "Proposal" (
    "id" TEXT NOT NULL,
    "demandId" TEXT NOT NULL,
    "researchGroupId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ProposalStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Proposal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_demandId_fkey" FOREIGN KEY ("demandId") REFERENCES "Demand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_researchGroupId_fkey" FOREIGN KEY ("researchGroupId") REFERENCES "ResearchGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proposal" ADD CONSTRAINT "Proposal_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
