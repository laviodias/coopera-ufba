-- CreateEnum
CREATE TYPE "SimilarityMatchType" AS ENUM ('PROJECT', 'DEMAND');

-- CreateTable
CREATE TABLE "SimilarityMatch" (
    "id" TEXT NOT NULL,
    "sourceType" "SimilarityMatchType" NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetType" "SimilarityMatchType" NOT NULL,
    "targetId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SimilarityMatch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SimilarityMatch_sourceType_sourceId_idx" ON "SimilarityMatch"("sourceType", "sourceId");
