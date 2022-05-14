-- CreateTable
CREATE TABLE "interviewers_availability" (
    "id" TEXT NOT NULL,
    "start_date" INTEGER NOT NULL,
    "end_date" INTEGER NOT NULL,
    "interviewer_id" TEXT NOT NULL,

    CONSTRAINT "interviewers_availability_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "interviewers_availability" ADD CONSTRAINT "interviewers_availability_interviewer_id_fkey" FOREIGN KEY ("interviewer_id") REFERENCES "interviewers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
