/*
  Warnings:

  - You are about to drop the `InterviewersAvailability` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "InterviewersAvailability" DROP CONSTRAINT "InterviewersAvailability_interviewer_id_fkey";

-- DropTable
DROP TABLE "InterviewersAvailability";

-- CreateTable
CREATE TABLE "interviewersAvailability" (
    "id" TEXT NOT NULL,
    "interviewer_id" TEXT NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endDate" INTEGER NOT NULL,

    CONSTRAINT "interviewersAvailability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "interviewersAvailability" ADD CONSTRAINT "interviewersAvailability_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "interviewers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
