/*
  Warnings:

  - You are about to drop the column `email` on the `interviewers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `interviewers` table. All the data in the column will be lost.
  - You are about to drop the `interviewersAvailability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `requests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "interviewersAvailability" DROP CONSTRAINT "interviewersAvailability_interviewer_id_fkey";

-- DropIndex
DROP INDEX "interviewers_email_key";

-- AlterTable
ALTER TABLE "interviewers" DROP COLUMN "email",
DROP COLUMN "password";

-- DropTable
DROP TABLE "interviewersAvailability";

-- DropTable
DROP TABLE "requests";
