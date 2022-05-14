-- CreateTable
CREATE TABLE "InterviewersAvailability" (
    "id" TEXT NOT NULL,
    "interviewer_id" TEXT NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endDate" INTEGER NOT NULL,

    CONSTRAINT "InterviewersAvailability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requests" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "startDate" INTEGER NOT NULL,
    "endDate" INTEGER NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewersAvailability" ADD CONSTRAINT "InterviewersAvailability_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "interviewers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
