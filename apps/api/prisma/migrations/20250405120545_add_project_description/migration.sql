/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Keyword` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `KnowledgeArea` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Keyword_name_key" ON "Keyword"("name");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeArea_name_key" ON "KnowledgeArea"("name");
