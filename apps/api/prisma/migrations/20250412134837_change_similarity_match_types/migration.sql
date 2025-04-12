/*
  Warnings:

  - The values [PROJECT] on the enum `SimilarityMatchType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SimilarityMatchType_new" AS ENUM ('RESEARCH_GROUP', 'DEMAND');
ALTER TABLE "SimilarityMatch" ALTER COLUMN "sourceType" TYPE "SimilarityMatchType_new" USING ("sourceType"::text::"SimilarityMatchType_new");
ALTER TABLE "SimilarityMatch" ALTER COLUMN "targetType" TYPE "SimilarityMatchType_new" USING ("targetType"::text::"SimilarityMatchType_new");
ALTER TYPE "SimilarityMatchType" RENAME TO "SimilarityMatchType_old";
ALTER TYPE "SimilarityMatchType_new" RENAME TO "SimilarityMatchType";
DROP TYPE "SimilarityMatchType_old";
COMMIT;
